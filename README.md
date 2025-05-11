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