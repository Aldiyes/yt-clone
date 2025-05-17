@Aldiyes

# #12 Mux Integration

- Create a responsive modal
- Create a free Mux account
  Copy and paste `.env`
  `MUX_TOKEN_ID=`
  `MUX_TOKEN_SECRET=`
  then, install `@mux/mux-uploader-react` and `@mux/mux-node`

```bash
npm install @mux/mux-uploader-react @mux/mux-node
```

- Add `muxStatus` on `videos` schema

```js
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

push to database:

```bash
npx drizzle-kit push
```

- Create webhook in mux
