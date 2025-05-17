import MuxUploader from '@mux/mux-uploader-react';
// import MuxUploader, {
// 	MuxUploaderDrop,
// 	MuxUploaderFileSelect,
// 	MuxUploaderProgress,
// 	MuxUploaderStatus,
// } from '@mux/mux-uploader-react';

type Props = {
	endpoint?: string | null;
	onSuccessAction: () => void;
};

export const StudioUploader = ({ endpoint }: Props) => {
	return (
		<div>
			<MuxUploader endpoint={endpoint} />
		</div>
	);
};
