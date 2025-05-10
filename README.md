@Aldiyes

# #03 Authentication

### Integration [Clerk](https://clerk.com/)

- install `@clerk/nextjs@6.19.2`

```bash
npm install @clerk/nextjs
```

### Set Clerk API Keys on `.env`

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=`
`CLERK_SECRET_KEY=`

### Add `middleware.ts`

```bash
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
```

### Add `ClerkProvider` to root layout

```html
import { ClerkProvider } from '@clerk/nextjs' export default function
RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) { return (
<ClerkProvider>
	// this one
	<html lang="en">
		<body
			className="{`${geistSans.variable}"
			${geistMono.variable}
			antialiased`}
		>
			{children}
		</body>
	</html>
</ClerkProvider>
) }
```

### Build a sign-in-or-up page on `src/app/sign-in/[[...sign-in]]/page.tsx`

```bash
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <SignIn />
}
```

### Add to `.env`:

`NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
`NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
`NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/`
`NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/`

- Add userButton
- Use auth state on sidebar sections
- Protected routes
