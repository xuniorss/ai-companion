'use client'

import { routes } from '@/constants/navigation'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

export const Sidebar = () => {
	const pathname = usePathname()
	const router = useRouter()

	const onNavigate = useCallback(
		(url: string, pro: boolean) => {
			// TODO: Check if PRO

			return router.push(url)
		},
		[router],
	)

	return (
		<aside className="flex h-full flex-col space-y-4 bg-secondary text-primary">
			<section className="flex flex-1 justify-center p-3">
				<nav className="space-y-2">
					{routes.map((route) => (
						<div
							role="button"
							aria-label={`Navegar para ${route.label}`}
							tabIndex={0}
							onClick={() => onNavigate(route.href, route.pro)}
							onKeyDown={(event) => {
								if (event.key === ' ' || event.key === 'Spacebar') {
									event.preventDefault()
									onNavigate(route.href, route.pro)
								}
							}}
							key={route.href}
							className={cn(
								'group flex w-full cursor-pointer justify-start rounded-lg p-3 text-xs font-medium text-muted-foreground transition hover:bg-primary/10',
								pathname === route.href && 'bg-primary/10',
							)}
						>
							<div className="flex flex-1 flex-col items-center gap-y-2">
								<route.icon className="h-5 w-5" />
								{route.label}
							</div>
						</div>
					))}
				</nav>
			</section>
		</aside>
	)
}
