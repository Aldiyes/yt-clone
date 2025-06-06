import {
	VideoAssetCreatedWebhookEvent,
	VideoAssetDeletedWebhookEvent,
	VideoAssetErroredWebhookEvent,
	VideoAssetReadyWebhookEvent,
	VideoAssetTrackReadyWebhookEvent,
} from '@mux/mux-node/resources/webhooks';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';

import { db } from '@/db';
import { videos } from '@/db/schema';
import { mux } from '@/lib/mux';

type WebhookEvent =
	| VideoAssetCreatedWebhookEvent
	| VideoAssetErroredWebhookEvent
	| VideoAssetReadyWebhookEvent
	| VideoAssetTrackReadyWebhookEvent
	| VideoAssetDeletedWebhookEvent;

const SIGNING_SECRET = process.env.MUX_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
	if (!SIGNING_SECRET) {
		throw new Error('MUX_WEBHOOK_SECRET is not set');
	}

	const headersPayload = await headers();
	const muxSignature = headersPayload.get('mux-signature');

	if (!muxSignature) {
		return new NextResponse('No signature found', { status: 401 });
	}

	const payload = await req.json();
	const body = JSON.stringify(payload);

	mux.webhooks.verifySignature(
		body,
		{
			'mux-signature': muxSignature,
		},
		SIGNING_SECRET
	);

	switch (payload.type as WebhookEvent['type']) {
		case 'video.asset.created': {
			const data = payload.data as VideoAssetCreatedWebhookEvent['data'];

			if (!data.upload_id) {
				return new NextResponse('No upload id found', { status: 400 });
			}

			await db
				.update(videos)
				.set({
					muxAssetId: data.id,
					muxStatus: data.status,
				})
				.where(eq(videos.muxUploadId, data.upload_id));
			break;
		}

		case 'video.asset.ready': {
			const data = payload.data as VideoAssetReadyWebhookEvent['data'];
			const playbackId = data.playback_ids?.[0].id;

			if (!data.upload_id) {
				return new NextResponse('Missing upload ID', { status: 400 });
			}

			if (!playbackId) {
				return new NextResponse('Missing playback ID', { status: 400 });
			}

			const tempThumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg`;
			const tempPreviewUrl = `https://image.mux.com/${playbackId}/animated.gif`;
			const duration = data.duration ? Math.round(data.duration * 1000) : 0;

			const utapi = new UTApi();
			const [uploadedThumbnail, uploadedPreview] =
				await utapi.uploadFilesFromUrl([tempThumbnailUrl, tempPreviewUrl]);

			if (!uploadedThumbnail.data || !uploadedPreview.data) {
				return new NextResponse('Failed to upload thumbnail or preview', {
					status: 400,
				});
			}

			const { key: thumbnailKey, url: thumbnailUrl } = uploadedThumbnail.data;
			const { key: previewKey, url: previewUrl } = uploadedPreview.data;

			await db
				.update(videos)
				.set({
					muxStatus: data.status,
					muxPlaybackId: playbackId,
					muxAssetId: data.id,
					thumbnailUrl,
					thumbnailKey,
					previewUrl,
					previewKey,
					duration,
				})
				.where(eq(videos.muxUploadId, data.upload_id));
			break;
		}

		case 'video.asset.errored': {
			const data = payload.data as VideoAssetErroredWebhookEvent['data'];

			if (!data.upload_id) {
				return new NextResponse('Missing upload ID', { status: 400 });
			}

			await db
				.update(videos)
				.set({
					muxStatus: data.status,
				})
				.where(eq(videos.muxUploadId, data.upload_id));
			break;
		}

		case 'video.asset.deleted': {
			const data = payload.data as VideoAssetDeletedWebhookEvent['data'];

			if (!data.upload_id) {
				return new NextResponse('Missing upload ID', { status: 400 });
			}

			await db.delete(videos).where(eq(videos.muxUploadId, data.upload_id));
			break;
		}

		case 'video.asset.track.ready': {
			const data = payload.data as VideoAssetTrackReadyWebhookEvent['data'] & {
				asset_id: string;
			};

			const assetId = data.asset_id;
			const trackId = data.id;
			const status = data.status;

			if (!assetId) {
				return new NextResponse('Missing asset ID', { status: 400 });
			}

			await db
				.update(videos)
				.set({
					muxTrackId: trackId,
					muxTrackStatus: status,
				})
				.where(eq(videos.muxAssetId, assetId));

			break;
		}
	}

	return new NextResponse('Webhook recived', { status: 200 });
}
