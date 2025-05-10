import { SidebarProvider } from '@/components/ui/sidebar';

import { HomeNavbar } from '@/modules/home/ui/components/home-navbar';

export const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<div className="w-full">
				<HomeNavbar />
				<div>{children}</div>
			</div>
		</SidebarProvider>
	);
};
