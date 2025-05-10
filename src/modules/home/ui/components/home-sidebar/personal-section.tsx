'use client';

import Link from 'next/link';

import { GoThumbsup } from 'react-icons/go';
import { LuListVideo } from 'react-icons/lu';
import { MdHistory } from 'react-icons/md';

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAuth } from '@clerk/clerk-react';
import { useClerk } from '@clerk/nextjs';

const ITEMS = [
	{
		title: 'History',
		url: '/playlists/history',
		icon: MdHistory,
		auth: true,
	},
	{
		title: 'Liked videos',
		url: '/playlists/liked',
		icon: GoThumbsup,
		auth: true,
	},
	{
		title: 'All playlists',
		url: '/playlists',
		icon: LuListVideo,
		auth: true,
	},
];

export const PersonalSection = () => {
	const clerk = useClerk();
	const { isSignedIn } = useAuth();

	return (
		<SidebarGroup>
			<SidebarGroupLabel>You</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{ITEMS.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								tooltip={item.title}
								asChild
								isActive={false} // TODO: change to look at current pathname
								onClick={(e) => {
									if (!isSignedIn && item.auth) {
										e.preventDefault();
										return clerk.openSignIn();
									}
								}}
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
