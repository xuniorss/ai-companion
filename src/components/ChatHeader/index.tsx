'use client'

import { useUser } from '@clerk/nextjs'
import { Companion, Message } from '@prisma/client'
import axios from 'axios'
import {
	ChevronLeft,
	Edit,
	MessagesSquare,
	MoreVertical,
	Trash,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { BotAvatar } from '../BotAvatar'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useToast } from '../ui/use-toast'

interface ChatHeaderProps {
	companion: Companion & { messages: Message[]; _count: { messages: number } }
}

export const ChatHeader = ({ companion }: ChatHeaderProps) => {
	const router = useRouter()
	const { user } = useUser()
	const { toast } = useToast()

	const onDelete = useCallback(async () => {
		try {
			await axios.delete(`/api/companion/${companion.id}`)

			toast({ description: 'Removido.' })

			router.refresh()
			router.push('/')
		} catch (error) {
			toast({ description: 'Algo deu errado.', variant: 'destructive' })
		}
	}, [companion.id, router, toast])

	return (
		<section className="flex w-full items-center justify-between border-b border-primary/10 pb-4">
			<div className="flex items-center gap-x-2">
				<Button
					aria-label="button back to home"
					onClick={() => router.back()}
					size="icon"
					variant="ghost"
				>
					<ChevronLeft className="h-8 w-8" />
				</Button>
				<BotAvatar src={companion.src} />
				<div className="flex flex-col gap-y-1">
					<div className="flex items-center gap-x-2">
						<p className="font-bold">{companion.name}</p>
						<span className="flex items-center text-xs text-muted-foreground">
							<MessagesSquare className="mr-1 h-3 w-3" />
							{companion._count.messages}
						</span>
					</div>
					<p className="text-xs text-muted-foreground">
						Criado por {companion.userName}
					</p>
				</div>
			</div>
			{user?.id === companion.userId && (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="secondary"
							size="icon"
							aria-label="show more options"
						>
							<MoreVertical />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() => router.push(`/companion/${companion.id}`)}
						>
							<Edit className="mr-2 h-4 w-4" />
							Editar
						</DropdownMenuItem>
						<DropdownMenuItem onClick={onDelete}>
							<Trash className="mr-2 h-4 w-4" />
							Deletar
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</section>
	)
}
