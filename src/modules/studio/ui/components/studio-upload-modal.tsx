'use client';

import { Loader2Icon, PlusIcon } from 'lucide-react';

import { ResponsiveModal } from '@/components/responsive-modal';
import { Button } from '@/components/ui/button';
import { trpc } from '@/trpc/client';
import { toast } from 'sonner';
import { StudioUploader } from './studio-uploader';

export const StudioUploadModal = () => {
	const utils = trpc.useUtils();
	const create = trpc.videos.create.useMutation({
		onSuccess: () => {
			toast.success('Video created');
			utils.studio.getMany.invalidate();
		},
		onError: (error) => {
			toast.error(error.message || 'Something went wrong');
		},
	});

	return (
		<>
			<ResponsiveModal
				title="Upload Video"
				open={!!create.data?.url}
				onOpenChangeAction={() => create.reset()}
			>
				{create.data?.url ? (
					<StudioUploader
						endpoint={create.data.url}
						onSuccessAction={() => {}}
					/>
				) : (
					<Loader2Icon />
				)}
			</ResponsiveModal>
			<Button
				variant="secondary"
				onClick={() => create.mutate()}
				disabled={create.isPending}
			>
				{create.isPending ? (
					<Loader2Icon className="animate-spin" />
				) : (
					<PlusIcon />
				)}
				Create
			</Button>
		</>
	);
};
