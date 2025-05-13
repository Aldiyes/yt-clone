@Aldiyes

# #10 Studio Videos

- Create videos schema
`src/db/schema.ts`
```js
export const videos = pgTable('videos', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  userId: uuid('user_id')
    .references(() => users.id, {
      onDelete: 'cascade',
  }).notNull(),
  categoryId: uuid('category_id').references(() => categories.id, {
    onDelete: 'set null',
  }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const videoRelations = relations(videos, ({ one }) => ({
  user: one(users, {
    fields: [videos.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [videos.categoryId],
    references: [categories.id],
  }),
}));

export const userRelations = relations(users, ({ many }) => ({
  videos: many(videos),
}));

export const categoryRelations = relations(categories, ({ many }) => ({
  videos: many(videos),
}));
```

- Push database changes

```bash
npx drizzle-kit push
```