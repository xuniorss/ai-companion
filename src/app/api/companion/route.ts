import prismadb from '@/lib/prismadb'
import { SchemaCompanionForm } from '@/models/companion'
import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
	try {
		const body = await req.json()
		const user = await currentUser()

		const { src, name, description, instructions, seed, categoryId } =
			SchemaCompanionForm.parse(body)

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

		const companion = await prismadb.companion.create({
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
		console.error('[COMPANION_POST]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
