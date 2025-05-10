@Aldiyes

# #04 Database setup

using `PostgreSQL` for database
using `drizzleORM` ORM (Object Relation Mapping)
why drizzleORM

- only ORM with both relational and SQL-like query APIs
- Serverless by default
- Forcing to "Understand" our queries

### Create a PostgreSQL database using [neon.tech](https://console.neon.tech)

Copy and paste `DATABASE_URL` from neon.tech to `.env`

### Setup DrizzleORM

- Install @neondatabase/serverless package

```shell
npm i drizzle-orm @neondatabase/serverless dotenv
npm i -D drizzle-kit tsx
```

- Connect Drizzle ORM to the database
  create file on `src/db` called: `index.ts`

```bash
import { drizzle } from 'drizzle-orm/neon-http';

const db = drizzle(process.env.DATABASE_URL);
```

- Create user schema
  create file on `src/db` called: `schema.ts`

```js
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  clerkId: text('clerk_id').unique().notNull(),
  name: text('name').notNull(),
  imageUrl: text('image_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

- Setup Drizzle Config file
  create a file on root called : `drizzle.config.ts`

```js
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

```

- Applying changes to database
```bash
npx drizzle-kit push
```
