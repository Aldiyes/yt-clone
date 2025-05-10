import Link from 'next/link';
import { FaYoutube } from 'react-icons/fa';

import { SidebarTrigger } from '@/components/ui/sidebar';

import { SearchInput } from '@/modules/home/ui/components/home-navbar/search-input';

export const HomeNavbar = () => {
	return (
		<nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50">
			<div className="flex items-center gap-4 w-full">
				{/* Menu and Logo */}
				<div className="flex items-center shrink-0">
					<SidebarTrigger />
					<Link href="/">
						<div className="p-4 flex items-center gap-1">
							<FaYoutube className="size-8 text-rose-500" />
							<span className="text-xl font-semibold tracking-tight">
								YouTube
							</span>
						</div>
					</Link>
				</div>

				{/* TODO: add Search bar */}
				<div className="flex flex-1 justify-center max-w-[720px] mx-auto">
					<SearchInput />
				</div>
			</div>
		</nav>
	);
};
