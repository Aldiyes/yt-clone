import { SidebarProvider } from '@/components/ui/sidebar';

import { StudioNavbar } from '@/modules/studio/ui/components/studio-navbar';
import { StudioSidebar } from '@/modules/studio/ui/components/studio-sidebar';

export const StudioLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<div className="w-full">
				<StudioNavbar />
				<div className="flex min-h-screen pt-[4rem]">
					<StudioSidebar />
					<main className="w-full h-full overflow-auto">{children}</main>
				</div>
			</div>
		</SidebarProvider>
	);
};
