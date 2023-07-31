import { useDeferredValue, useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay?: number): T {
	const [debauncedValue, setDebauncedValue] = useState<T>(value)
	const deferredValue = useDeferredValue(debauncedValue)

	useEffect(() => {
		const timer = setTimeout(() => setDebauncedValue(value), delay || 500)

		return () => clearTimeout(timer)
	}, [delay, value])

	return deferredValue
}
