import { Menu } from 'lucide-react'

import { Sidebar } from '../Sidebar'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

export const MobileSidebar = () => {
	return (
		<Sheet>
			<SheetTrigger className="pr-4 md:hidden">
				<Menu role="button" aria-label="button open/close sidebar" />
			</SheetTrigger>
			<SheetContent side="left" className="w-32 bg-secondary p-0 pt-10">
				<Sidebar />
			</SheetContent>
		</Sheet>
	)
}
