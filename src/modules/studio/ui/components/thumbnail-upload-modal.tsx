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
			<p>Hello</p>
		</ResponsiveModal>
	);
};
