import { z } from 'zod'

export const SchemaCompanionForm = z.object({
	name: z.string().min(1, { message: 'Nome é obrigatório.' }),
	description: z.string().min(1, { message: 'Descrição é obrigatória.' }),
	instructions: z.string().min(200, {
		message: 'As instruções requerem pelo menos 200 caracteres.',
	}),
	seed: z.string().min(200, {
		message: 'Seed requerem pelo menos 200 caracteres.',
	}),
	src: z.string().url().min(1, { message: 'Imagem é obrigatória.' }),
	categoryId: z
		.string()
		.uuid()
		.min(1, { message: 'Categoria é obrigatória.' }),
})

export type CompanionForm = z.infer<typeof SchemaCompanionForm>
