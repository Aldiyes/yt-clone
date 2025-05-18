import {
	VideoAssetCreatedWebhookEvent,
	VideoAssetErroredWebhookEvent,
	VideoAssetReadyWebhookEvent,
	VideoAssetTrackReadyWebhookEvent,
} from '@mux/mux-node/resources/webhooks';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/db';
import { videos } from '@/db/schema';
import { mux } from '@/lib/mux';

type WebhookEvent =
	| VideoAssetCreatedWebhookEvent
	| VideoAssetErroredWebhookEvent
	| VideoAssetReadyWebhookEvent
	| VideoAssetTrackReadyWebhookEvent;

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

			const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg`;

			await db
				.update(videos)
				.set({
					muxStatus: data.status,
					muxPlaybackId: playbackId,
					muxAssetId: data.id,
					thumbnailUrl,
				})
				.where(eq(videos.muxUploadId, data.id));
			break;
		}
	}

	return new NextResponse('Webhook recived', { status: 200 });
}
