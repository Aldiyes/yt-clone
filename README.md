@Aldiyes

# #07 [tRPC](https://trpc.io/docs/client/react/server-components) Configuration

- Enable transformer on tRPC
- Add auth to tRPC context
- Add protectedProcedure
- Add rate limiting using [Upstash](https://console.upstash.com/)

### Installation

```bash
npm install @upstash/redis@latest @upstash/ratelimit@latest
```

### Configure `.env` file

`UPSTASH_REDIS_REST_URL=`
`UPSTASH_REDIS_REST_TOKEN=`

### Create redis

`src/lib/redis.ts`

```js
import { Redis } from '@upstash/redis';

export const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
```

### Create Ratelimit

`src/lib/ratelimit.ts`

```js
import { Ratelimit } from '@upstash/ratelimit';

import { redis } from '@/lib/redis';

export const ratelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(10, '10s'),
});
```
