'use client';

import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { trpc } from '@/trpc/client';

export const StudioUploadModal = () => {
	const create = trpc.videos.create.useMutation();

	return (
		<Button variant="secondary" onClick={() => create.mutate()}>
			<PlusIcon />
			Create
		</Button>
	);
};
