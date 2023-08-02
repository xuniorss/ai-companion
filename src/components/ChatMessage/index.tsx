'use client'

import { cn } from '@/lib/utils'
import { Copy } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCallback } from 'react'
import { BeatLoader } from 'react-spinners'
import { BotAvatar } from '../BotAvatar'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import { UserAvatar } from '../UserAvatar'

export interface ChatMessageProps {
	role: 'system' | 'user'
	content?: string
	isLoading?: boolean
	src?: string
}

export const ChatMessage = ({
	role,
	content,
	isLoading,
	src,
}: ChatMessageProps) => {
	const { toast } = useToast()
	const { theme } = useTheme()

	const onCopy = useCallback(() => {
		if (!content) return

		navigator.clipboard.writeText(content)

		toast({ description: 'Mensagem copiada.' })
	}, [content, toast])

	return (
		<div
			className={cn(
				'group flex w-full items-start gap-x-3 py-4',
				role === 'user' && 'justify-end',
			)}
		>
			{role !== 'user' && src && <BotAvatar src={src} />}
			<div className="max-w-sm rounded-md bg-primary/10 px-4 py-2 text-sm">
				{isLoading && (
					<BeatLoader
						size={5}
						color={theme === 'light' ? 'black' : 'white'}
					/>
				)}
				{!isLoading && content}
			</div>
			{role === 'user' && <UserAvatar />}
			{role !== 'user' && !isLoading && (
				<Button
					aria-label="button copy message"
					onClick={onCopy}
					className="invisible transition group-hover:visible"
					size="icon"
					variant="ghost"
				>
					<Copy className="h-4 w-4" />
				</Button>
			)}
		</div>
	)
}
