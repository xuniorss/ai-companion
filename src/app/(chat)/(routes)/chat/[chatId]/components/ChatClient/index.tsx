'use client'

import { ChatHeader } from '@/components/ChatHeader'
import { Companion, Message } from '@prisma/client'

interface ChatClientProps {
	companion: Companion & { messages: Message[]; _count: { messages: number } }
}

export const ChatClient = ({ companion }: ChatClientProps) => {
	return (
		<article className="flex h-full flex-col space-y-2 p-4">
			<ChatHeader companion={companion} />
		</article>
	)
}
