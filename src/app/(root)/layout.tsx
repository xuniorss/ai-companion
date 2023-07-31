import { Navbar } from '@/components/Navbar'
import { ReactNode } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
	return (
		<div className="h-full">
			<Navbar />
			<main className="h-full pt-16 md:pl-20">{children}</main>
		</div>
	)
}
