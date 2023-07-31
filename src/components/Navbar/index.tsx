'use client'

import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import { Menu, Sparkles } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { ModeToggle } from '../ModeToggle'
import { Button } from '../ui/button'

const font = Poppins({ weight: '600', subsets: ['latin'] })

export const Navbar = () => {
	return (
		<header className="fixed z-50 flex w-full items-center justify-between border-b border-b-primary/10 bg-secondary px-4 py-2">
			<section className="flex items-center">
				<Menu
					role="button"
					aria-label="button open/close sidebar"
					className="block md:hidden"
				/>
				<Link href="/">
					<h1
						className={cn(
							'hidden text-xl font-bold text-primary md:block md:text-3xl',
							font.className,
						)}
					>
						companion.ai
					</h1>
				</Link>
			</section>
			<section className="flex items-center gap-x-3">
				<Button size="sm" variant="premium">
					Upgrade
					<Sparkles className="ml-2 h-4 w-4 fill-white text-white" />
				</Button>
				<ModeToggle />
				<UserButton />
			</section>
		</header>
	)
}
