@Aldiyes

# #06 [tRPC](https://trpc.io/docs/client/react/server-components) Setup

Why tRPC?

- end-to-end typesafety
- Familiar hooks (useQuery, useMutation, etc.)
- V11 allow to do authentication prefetching

Why prefetch?

- "render as you fetch" concept
- leverage RSCs ad "loader"
- fast load time
- parallel data loading

### Installation

```bash
npm install @trpc/server @trpc/client @trpc/react-query @tanstack/react-query@latest zod client-only server-only
```

### Create tRPC router

`src/trpc/init.ts`

```js
import { initTRPC } from '@trpc/server';
import { cache } from 'react';
export const createTRPCContext = cache(async () => {
	/**
	 * @see: https://trpc.io/docs/server/context
	 */
	return { userId: 'user_123' };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
	/**
	 * @see https://trpc.io/docs/server/data-transformers
	 */
	// transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
```

`src/trpc/routers/_app.ts`

```js
import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
export const appRouter = createTRPCRouter({
	hello: baseProcedure
		.input(
			z.object({
				text: z.string(),
			})
		)
		.query((opts) => {
			return {
				greeting: `hello ${opts.input.text}`,
			};
		}),
});
// export type definition of API
export type AppRouter = typeof appRouter;
```

`src/app/api/trpc/[trpc]/route.ts`

```js
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createTRPCContext } from '@/trpc/init';
import { appRouter } from '@/trpc/routers/_app';
const handler = (req: Request) =>
	fetchRequestHandler({
		endpoint: '/api/trpc',
		req,
		router: appRouter,
		createContext: createTRPCContext,
	});
export { handler as GET, handler as POST };
```
