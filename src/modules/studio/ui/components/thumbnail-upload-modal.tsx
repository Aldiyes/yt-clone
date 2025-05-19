import { UploadDropzone } from '@/lib/uploadthing';

import { ResponsiveModal } from '@/components/responsive-modal';
import { trpc } from '@/trpc/client';

type Props = {
	videoId: string;
	open: boolean;
	onOpenChangeAction: (open: boolean) => void;
};

export const ThumbnailUploadModal = ({
	videoId,
	open,
	onOpenChangeAction,
}: Props) => {
	const utils = trpc.useUtils();

	const onUploadComplete = () => {
		utils.studio.getMany.invalidate();
		utils.studio.getOne.invalidate({ id: videoId });
		onOpenChangeAction(false);
	};

	return (
		<ResponsiveModal
			title="Upload a thumbnail"
			open={open}
			onOpenChangeAction={onOpenChangeAction}
		>
			<UploadDropzone
				endpoint="thumbnailUploader"
				input={{ videoId }}
				onClientUploadComplete={onUploadComplete}
				className="ut-label:text-lg ut-button:bg-primary ut-button:mb-10 ut-upload-icon:mt-8 ut-allowed-content:ut-uploading:text-red-300"
			/>
		</ResponsiveModal>
	);
};
