import { Categories } from '@/components/Categories'
import { SearchInput } from '@/components/SearchInput'
import prismadb from '@/lib/prismadb'

export default async function RootPage() {
	const categories = await prismadb.category.findMany()

	return (
		<article className="h-full space-y-2 p-4">
			<SearchInput />
			<Categories data={categories} />
		</article>
	)
}
