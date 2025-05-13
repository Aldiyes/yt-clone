import Link from 'next/link';

import { FaYoutube } from 'react-icons/fa';

import { SidebarTrigger } from '@/components/ui/sidebar';

import { AuthButton } from '@/modules/auth/ui/components/auth-button';

export const StudioNavbar = () => {
	return (
		<nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50 border-b shadow-md">
			<div className="flex items-center gap-4 w-full">
				<div className="flex items-center shrink-0">
					<SidebarTrigger />
					<Link href="/studio">
						<div className="p-4 flex items-center gap-1">
							<FaYoutube className="size-8 text-rose-500" />
							<span className="text-xl font-semibold tracking-tight">
								Studio
							</span>
						</div>
					</Link>
				</div>

				<div className="flex-1" />

				<div className="flex shrink-0 items-center gap-4">
					<AuthButton />
				</div>
			</div>
		</nav>
	);
};
