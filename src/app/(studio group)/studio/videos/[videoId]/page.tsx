import { HydrateClient, trpc } from '@/trpc/server';

import { VideoView } from '@/modules/studio/ui/views/video-view';

export const dynamic = 'force-dynamic';

type Props = {
	params: Promise<{ videoId: string }>;
};

export default async function RootVideoIdPage({ params }: Props) {
	const { videoId } = await params;

	void trpc.studio.getOne.prefetch({ id: videoId });
	void trpc.categories.getMany.prefetch();

	return (
		<HydrateClient>
			<VideoView videoId={videoId} />
		</HydrateClient>
	);
}
