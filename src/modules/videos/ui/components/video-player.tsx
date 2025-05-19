'use client';

import { THUMBNAIL_FALLBACK } from '@/constants';
import MuxPlayer from '@mux/mux-player-react';
type Props = {
	playbackId?: string | null | undefined;
	thumbnailUrl?: string | null | undefined;
	autoPlay?: boolean;
	onPlayAction?: () => void;
};

export const VideoPlayer = ({
	playbackId,
	thumbnailUrl,
	autoPlay,
	onPlayAction,
}: Props) => {
	return (
		<MuxPlayer
			playbackId={playbackId || ''}
			poster={thumbnailUrl || THUMBNAIL_FALLBACK}
			playerInitTime={0}
			autoPlay={autoPlay}
			thumbnailTime={0}
			className="size-full object-contain"
			accentColor="#ff2056"
			onPlay={onPlayAction}
		/>
	);
};
