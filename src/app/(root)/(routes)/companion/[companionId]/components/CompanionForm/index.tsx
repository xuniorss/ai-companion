'use client'

import { ImageUpload } from '@/components/ImageUpload'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { PREAMBLE, SEED_CHAT } from '@/constants/companion'
import {
	CompanionForm as CompProps,
	SchemaCompanionForm,
} from '@/models/companion'
import { zodResolver } from '@hookform/resolvers/zod'
import { Category, Companion } from '@prisma/client'
import { Wand2 } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface CompanionFormProps {
	initialData: Companion | null
	categories: Category[]
}

export const CompanionForm = ({
	initialData,
	categories,
}: CompanionFormProps) => {
	const form = useForm<CompProps>({
		resolver: zodResolver(SchemaCompanionForm),
		defaultValues: initialData || {
			name: '',
			description: '',
			instructions: '',
			seed: '',
			src: '',
			categoryId: undefined,
		},
	})

	const isLoading = useMemo(
		() => form.formState.isSubmitting,
		[form.formState.isSubmitting],
	)

	const onSubmit: SubmitHandler<CompProps> = useCallback(async (values) => {
		console.log(values)
	}, [])

	return (
		<article className="mx-auto h-full max-w-3xl space-y-2 p-4">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 pb-10"
				>
					<section className="w-full space-y-2">
						<div>
							<h3 className="text-lg font-medium">Informações gerais</h3>
							<p className="text-sm text-muted-foreground">
								Informações gerais sobre seu companion
							</p>
						</div>
						<Separator className="bg-primary/10" />
					</section>
					<FormField
						name="src"
						render={({ field }) => (
							<FormItem className="flex flex-col items-center justify-center space-y-4">
								<FormControl>
									<ImageUpload
										disabled={isLoading}
										onChange={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<FormField
							name="name"
							control={form.control}
							render={({ field }) => (
								<FormItem className="col-span-2 md:col-span-1">
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder="Elon Musk"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										É assim que seu AI Companion será nomeado.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="description"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descrição</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder="CEO & Fundador da Tesla, SpaceX"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Breve descrição do seu AI Companion
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="categoryId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Categoria</FormLabel>
									<Select
										disabled={isLoading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="bg-background">
												<SelectValue
													defaultValue={field.value}
													placeholder="Selecione uma categoria"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem
													key={category.id}
													value={category.id}
												>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>
										Selecione uma categoria para sua IA
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="w-full space-y-2">
						<div>
							<h3 className="text-lg font-medium">Configuração</h3>
							<p className="text-sm text-muted-foreground">
								Instruções detalhadas para comportamento de IA
							</p>
						</div>
						<Separator className="bg-primary/10" />
					</div>
					<FormField
						name="instructions"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Instruções</FormLabel>
								<FormControl>
									<Textarea
										disabled={isLoading}
										rows={7}
										className="resize-none bg-background"
										placeholder={PREAMBLE}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Descreva detalhadamente seu acompanhante
									companion&apos;s história de fundo e detalhes
									relevantes.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="seed"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Example Conversation</FormLabel>
								<FormControl>
									<Textarea
										disabled={isLoading}
										rows={7}
										className="resize-none bg-background"
										placeholder={SEED_CHAT}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Escreva alguns exemplos de um humano conversando com
									seu companheiro de IA, escreva as respostas
									esperadas.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex w-full justify-center">
						<Button size="lg" disabled={isLoading}>
							{initialData
								? 'Edite seu companion'
								: 'Crie o seu companion'}
							<Wand2 className="ml-2 h-4 w-4" />
						</Button>
					</div>
				</form>
			</Form>
		</article>
	)
}
