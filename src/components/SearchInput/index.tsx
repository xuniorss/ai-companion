'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import {
	ChangeEventHandler,
	useCallback,
	useDeferredValue,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { Input } from '../ui/input'

export const SearchInput = () => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const categoryId = useMemo(
		() => searchParams.get('categoryId'),
		[searchParams],
	)

	const name = useMemo(() => searchParams.get('name'), [searchParams])

	const [value, setValue] = useState(name || '')
	// const debouncedValue = useDebounce<string>(value)
	const defferedValue = useDeferredValue(value)

	const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
		(e) => setValue(e.target.value),
		[],
	)

	useEffect(() => {
		const query: { name: string; categoryId: string | null } = {
			name: defferedValue,
			categoryId,
		}

		const url = qs.stringifyUrl(
			{
				url: window.location.href,
				query,
			},
			{ skipEmptyString: true, skipNull: true },
		)

		router.push(url)
	}, [categoryId, defferedValue, router])

	return (
		<div className="relative">
			<Search className="absolute left-4 top-3 h-4 w-4 text-muted-foreground" />
			<Input
				placeholder="Pesquisar..."
				className="bg-primary/10 pl-10"
				value={value}
				onChange={onChange}
			/>
		</div>
	)
}
