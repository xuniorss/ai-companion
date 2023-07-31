import { RoutesProps } from '@/models/navigation'
import { Home, Plus, Settings } from 'lucide-react'

export const routes: RoutesProps[] = [
	{ icon: Home, href: '/', label: 'Início', pro: false },
	{ icon: Plus, href: '/companion/new', label: 'Criar', pro: true },
	{ icon: Settings, href: '/settings', label: 'Configs', pro: false },
]
