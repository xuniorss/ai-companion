import prismadb from '@/lib/prismadb'
import { SchemaCompanionForm } from '@/models/companion'
import { auth, currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export const PATCH = async (
	req: Request,
	{ params }: { params: { companionId: string } },
) => {
	try {
		const body = await req.json()
		const user = await currentUser()

		const { src, name, description, instructions, seed, categoryId } =
			SchemaCompanionForm.parse(body)

		if (!params.companionId)
			return new NextResponse('Companion ID is required', { status: 404 })

		if (!user || !user.id || !user.emailAddresses[0].emailAddress)
			return new NextResponse('Unauthorized', { status: 401 })

		if (
			!src ||
			!name ||
			!description ||
			!instructions ||
			!seed ||
			!categoryId
		)
			return new NextResponse('Missing required fields', { status: 400 })

		// TODO: Check for subscriptions

		const companion = await prismadb.companion.update({
			where: { id: params.companionId, userId: user.id },
			data: {
				categoryId,
				userId: user.id,
				userName: user.firstName || user.emailAddresses[0].emailAddress,
				src,
				name,
				description,
				instructions,
				seed,
			},
		})

		return NextResponse.json(companion)
	} catch (error) {
		console.error('[COMPANION_PATCH]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}

export const DELETE = async (
	req: Request,
	{ params }: { params: { companionId: string } },
) => {
	try {
		const { userId } = auth()

		if (!userId) return new NextResponse('Unauthorized', { status: 401 })

		const companion = await prismadb.companion.delete({
			where: { userId, id: params.companionId },
		})

		return NextResponse.json(companion)
	} catch (error) {
		console.error('[COMPANION_DELETE]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
