import Image from 'next/image';
import { PiRobotFill } from 'react-icons/pi';

type Props = {
	imageUrl?: string | null;
};

export const VideoThumbnail = ({ imageUrl }: Props) => {
	return (
		<div className="relative">
			{/* Thumbnail wrapper */}
			<div className="relative w-full overflow-hidden rounded-xl aspect-video bg-neutral-900">
				{imageUrl ? (
					<Image src={imageUrl} alt="Thumbnail" fill className="size-full" />
				) : (
					<div className="size-full flex items-center justify-center">
						<PiRobotFill className="text-rose-500 size-8" />
					</div>
				)}
			</div>
			{/* TODO: video duration box */}
		</div>
	);
};
