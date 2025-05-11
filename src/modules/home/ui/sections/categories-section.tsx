import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { FilterCarousel } from '@/components/filter-carouse';
import { trpc } from '@/trpc/client';
import { useRouter } from 'next/navigation';

type Props = {
	categoryId?: string;
};

export const CategoriesSection = ({ categoryId }: Props) => {
	return (
		<Suspense fallback={<CategoriesSkeleton />}>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<CategoriesSectionSuspense categoryId={categoryId} />
			</ErrorBoundary>
		</Suspense>
	);
};
const CategoriesSkeleton = () => {
	return (
		<FilterCarousel
			isLoading
			data={[]}
			onSelectAction={() => {
				return;
			}}
		/>
	);
};

const CategoriesSectionSuspense = ({ categoryId }: Props) => {
	const [categories] = trpc.categories.getMany.useSuspenseQuery();

	const router = useRouter();

	const data = categories.map((category) => ({
		value: category.id,
		label: category.name,
	}));

	const onSelect = (value: string | null) => {
		const url = new URL(window.location.href);

		if (value) {
			url.searchParams.set('categoryId', value);
		} else {
			url.searchParams.delete('categoryId');
		}

		router.push(url.toString());
	};

	return (
		<FilterCarousel onSelectAction={onSelect} value={categoryId} data={data} />
	);
};
