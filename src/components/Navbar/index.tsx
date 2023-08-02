'use client'

import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import { Sparkles } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { MobileSidebar } from '../MobileSidebar'
import { ModeToggle } from '../ModeToggle'
import { Button } from '../ui/button'

const font = Poppins({ weight: '600', subsets: ['latin'] })

export const Navbar = () => {
	return (
		<header className="fixed z-50 flex h-16 w-full items-center justify-between border-b border-b-primary/10 bg-secondary px-4 py-2">
			<section className="flex items-center">
				<MobileSidebar />
				<Link href="/" aria-label="Ir para página inicial">
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
				<Button
					size="sm"
					variant="premium"
					aria-label="button upgrade plan"
				>
					Upgrade
					<Sparkles className="ml-2 h-4 w-4 fill-white text-white" />
				</Button>
				<ModeToggle />
				<UserButton afterSignOutUrl="/" />
			</section>
		</header>
	)
}
