import { HydrateClient, trpc } from '@/trpc/server';

export const dynamic = 'force-dynamic';

type Props = {
	params: Promise<{ videoId: string }>;
};

export default async function RootVideoIdPage({ params }: Props) {
	const { videoId } = await params;
	void trpc.studio.getOne({ id: videoId });

	return (
		<HydrateClient>
			videoId: {videoId}
			{/* TODO: Create VideoView content */}
		</HydrateClient>
	);
}
