import { Toaster } from '@/components/ui/sonner';
import { TRPCProvider } from '@/trpc/client';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'YouTube',
	description: 'Create by: Aldiyes Paskalis Birta',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={roboto.className}>
					<TRPCProvider>
						<Toaster />
						{children}
					</TRPCProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
