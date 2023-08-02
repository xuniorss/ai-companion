import prismadb from '@/lib/prismadb'
import { auth, redirectToSignIn } from '@clerk/nextjs'
import { CompanionForm } from './components/CompanionForm'

interface CompanionIdPageProps {
	params: { companionId: string }
}

export default async function CompanionIdPage({
	params,
}: CompanionIdPageProps) {
	const { userId } = auth()

	// TODO: Check subscription

	if (!userId) return redirectToSignIn()

	const companion = await prismadb.companion.findUnique({
		where: { id: params.companionId, userId },
	})

	const categories = await prismadb.category.findMany()

	return <CompanionForm initialData={companion} categories={categories} />
}
