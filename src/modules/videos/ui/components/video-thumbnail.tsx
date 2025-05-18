import { PiRobotFill } from 'react-icons/pi';

export const VideoThumbnail = () => {
	return (
		<div className="relative">
			{/* Thumbnail wrapper */}
			<div className="relative w-full overflow-hidden rounded-xl aspect-video bg-neutral-900">
				<div className="size-full flex items-center justify-center">
					<PiRobotFill className="text-rose-500 size-8" />
				</div>
			</div>
			{/* TODO: video duration box */}
		</div>
	);
};
