import { HomeLayout } from '@/modules/home/ui/layouts/home-layout';

export default function RootHomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <HomeLayout>{children}</HomeLayout>;
}
