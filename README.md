@Aldiyes

# #08 Video categories

- Create categories schema

```js
export const categories = pgTable(
	'categories',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		name: text('name').notNull().unique(),
		description: text('description'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull(),
	},
	(t) => [uniqueIndex('name_idx').on(t.name)]
);
```

- Push changes to the database

```bash
npx drizzle-kit push
```
