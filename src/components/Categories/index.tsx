'use client'

import { Category } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useCallback, useMemo } from 'react'
import { ButtonCategory } from './button-category'

interface CategoriesProps {
	data: Category[]
}

export const Categories = ({ data }: CategoriesProps) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const categoryId = useMemo(
		() => searchParams.get('categoryId'),
		[searchParams],
	)

	const onClick = useCallback(
		(id: string | undefined) => {
			const query: { categoryId: string | undefined } = { categoryId: id }

			const url = qs.stringifyUrl(
				{
					url: window.location.href,
					query,
				},
				{ skipNull: true },
			)

			router.push(url)
		},
		[router],
	)

	return (
		<section className="flex w-full space-x-2 overflow-x-auto p-1">
			<ButtonCategory
				aria-label="button show newest"
				onClick={() => onClick(undefined)}
				bgColor={!categoryId ? 'default' : 'active'}
			>
				Recentes
			</ButtonCategory>
			{data.map((item) => (
				<ButtonCategory
					aria-label={`button show ${item.name}`}
					onClick={() => onClick(item.id)}
					key={item.id}
					bgColor={item.id === categoryId ? 'default' : 'active'}
				>
					{item.name}
				</ButtonCategory>
			))}
		</section>
	)
}
