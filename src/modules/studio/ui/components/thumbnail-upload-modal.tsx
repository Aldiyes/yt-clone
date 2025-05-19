import { UploadDropzone } from '@/lib/uploadthing';

import { ResponsiveModal } from '@/components/responsive-modal';

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
	return (
		<ResponsiveModal
			title="Upload a thumbnail"
			open={open}
			onOpenChangeAction={onOpenChangeAction}
		>
			<UploadDropzone
				endpoint="imageUploader"
				className="ut-label:text-lg ut-button:bg-primary ut-allowed-content:ut-uploading:text-red-300"
			/>
		</ResponsiveModal>
	);
};
