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

- Seed categories
  `src/db/index.ts`

```js
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { drizzle } from 'drizzle-orm/neon-http';

export const db = drizzle(process.env.DATABASE_URL!);
```

`src/db/seed.ts`

```js
import { db } from '.';
import { categories } from './schema';

const categoryNames = [
	'Cars and vehicles',
	'Comedy',
	'Education',
	'Entertainment',
	'Film and animation',
	'How-to and style',
	'Music',
	'News and politic',
	'People and blogs',
	'Pets and animals',
	'Science and technology',
	'Sports',
	'Travel and events',
];

async function main() {
	console.log('Seeding categories');

	try {
		const values = categoryNames.map((name) => ({
			name,
			description: `Videos related to ${name.toLowerCase}`,
		}));

		await db.insert(categories).values(values);
		console.log('Categories seeded successfully!');
	} catch (error) {
		console.error('Error seeding categories: ', error);
	}
}

main();
```

seeding categories:

```bash
npx tsx src/db/seed.ts
```

- Prefetch categories
- create categories component
