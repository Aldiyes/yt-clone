@Aldiyes

# #13 Mux Webhook

### Update video schema

```js
export const videos = pgTable('videos', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: text('title').notNull(),
	description: text('description'),
	muxStatus: text('mux_status'),
	muxAssetId: text('mux_asset_id').unique(),
	muxUploadId: text('mux_upload_id').unique(),
	muxPlaybackId: text('mux_playback_id').unique(),
	muxTrackId: text('mux_track_id').unique(),
	muxTrackStatus: text('mux_track_status'),
	// Add thumbnailUrl to videos schema
	thumbnailUrl: text('thumbnail_url'),

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
