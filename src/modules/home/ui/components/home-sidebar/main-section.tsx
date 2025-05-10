'use client';

import Link from 'next/link';

// import { AiFillPlaySquare, AiOutlinePlaySquare } from 'react-icons/ai';
// import { MdHome, MdOutlineHome } from 'react-icons/md';
// import { TbFlame, TbFlameFilled } from 'react-icons/tb';

import { AiOutlinePlaySquare } from 'react-icons/ai';
import { MdOutlineHome } from 'react-icons/md';
import { TbFlame } from 'react-icons/tb';

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';

const ITEMS = [
	{
		title: 'Home',
		url: '/',
		icon: MdOutlineHome,
	},
	{
		title: 'Subscriptions',
		url: '/feed/subscriptions',
		icon: AiOutlinePlaySquare,
		auth: true,
	},
	{
		title: 'Trending',
		url: '/feed/trending',
		icon: TbFlame,
	},
];

export const MainSection = () => {
	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu>
					{ITEMS.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								tooltip={item.title}
								asChild
								isActive={false} // TODO: change to look at current pathname
								onClick={() => {}} // TODO: do something on click
							>
								<Link href={item.url} className="flex items-center gap-4">
									<item.icon />
									<span className="text-sm">{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};
