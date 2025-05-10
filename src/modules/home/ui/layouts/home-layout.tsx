import { SidebarProvider } from '@/components/ui/sidebar';

import { HomeNavbar } from '@/modules/home/ui/components/home-navbar';
import { HomeSidebar } from '@/modules/home/ui/components/home-sidebar';

export const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<div className="w-full">
				<HomeNavbar />
				<div className="flex min-h-screen pt-[4rem]">
					<HomeSidebar />
					<main>{children}</main>
				</div>
			</div>
		</SidebarProvider>
	);
};
