import Image from 'next/image';
import { PiRobotFill } from 'react-icons/pi';

type Props = {
	title: string;
	imageUrl?: string | null;
	previewUrl?: string | null;
};

export const VideoThumbnail = ({ title, imageUrl, previewUrl }: Props) => {
	return (
		<div className="relative group">
			{/* Thumbnail wrapper */}
			<div className="relative w-full overflow-hidden rounded-xl aspect-video bg-neutral-900">
				{imageUrl ? (
					<>
						<Image
							src={imageUrl}
							alt={title}
							fill
							className="size-full object-cover group-hover:opacity-0"
						/>
						{previewUrl && (
							<Image
								src={previewUrl}
								alt={title}
								fill
								className="size-full object-cover opacity-0 group-hover:opacity-100"
							/>
						)}
					</>
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
