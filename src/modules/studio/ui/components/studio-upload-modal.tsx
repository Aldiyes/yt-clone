'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Loader2Icon, PlusIcon } from 'lucide-react';

import { trpc } from '@/trpc/client';

import { ResponsiveModal } from '@/components/responsive-modal';
import { Button } from '@/components/ui/button';

import { StudioUploader } from '@/modules/studio/ui/components/studio-uploader';

export const StudioUploadModal = () => {
	const router = useRouter();
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

	const onSuccess = () => {
		if (!create.data?.video.id) return;

		create.reset();
		router.push(`/studio/videos/${create.data.video.id}`);
	};

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
						onSuccessAction={onSuccess}
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
