// @ts-ignore
const { PrismaClient } = require('@prisma/client')

const db = new PrismaClient()

async function main() {
	try {
		await db.category.createMany({
			data: [
				{ name: 'Pessoas famosas' },
				{ name: 'Filmes & TV' },
				{ name: 'Músicos' },
				{ name: 'Jogos' },
				{ name: 'Animais' },
				{ name: 'Filosofia' },
				{ name: 'Cientistas' },
			],
		})
	} catch (error) {
		console.error('Error seeding default categories:', error)
	} finally {
		await db.$disconnect()
	}
}

main()
