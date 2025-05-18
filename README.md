@Aldiyes

# #13 Mux Webhook

### Update video schema

```js
export const videoVisibility = pgEnum('video_visibility', [
	'private',
	'public',
]);

export const videos = pgTable('videos', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: text('title').notNull(),
	description: text('description'),
	// MUX
	muxStatus: text('mux_status'),
	muxAssetId: text('mux_asset_id').unique(),
	muxUploadId: text('mux_upload_id').unique(),
	muxPlaybackId: text('mux_playback_id').unique(),
	muxTrackId: text('mux_track_id').unique(),
	muxTrackStatus: text('mux_track_status'),
	thumbnailUrl: text('thumbnail_url'),
	previewUrl: text('preview_url'),
	duration: integer('duration').default(0).notNull(),
	visibility: videoVisibility('visibility').default('private').notNull(),

	userId: uuid('user_id')
		.references(() => users.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	categoryId: uuid('category_id').references(() => categories.id, {
		onDelete: 'set null',
	}),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

### Push database changes

```bash
npx drizzle-kit push
```

### Handle "video.asset.ready" event

`api/videos/webhook/route.ts`

```js
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
			const previewUrl = `https://image.mux.com/${playbackId}/animated.gif`;

			const duration = data.duration ? Math.round(data.duration * 1000) : 0;

			await db
				.update(videos)
				.set({
					muxStatus: data.status,
					muxPlaybackId: playbackId,
					muxAssetId: data.id,
					thumbnailUrl,
					previewUrl,
					duration
				})
				.where(eq(videos.muxUploadId, data.id));
			break;
		}
```

- assign thumbnail
- assign preview

### Handle "video.asset.errored" event

- update status

### Handle "video.asset.deleted" event

- delete from database

### Handle "video.asset.track.ready" event

- update trackId and trackStatus
