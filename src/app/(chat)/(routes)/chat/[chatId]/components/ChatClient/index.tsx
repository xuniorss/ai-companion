'use client'

import { ChatForm } from '@/components/ChatForm'
import { ChatHeader } from '@/components/ChatHeader'
import { ChatMessageProps } from '@/components/ChatMessage'
import { ChatMessages } from '@/components/ChatMessages'
import { Companion, Message } from '@prisma/client'
import { useCompletion } from 'ai/react'
import { useRouter } from 'next/navigation'
import { FormEvent, useCallback, useState } from 'react'

interface ChatClientProps {
	companion: Companion & { messages: Message[]; _count: { messages: number } }
}

export const ChatClient = ({ companion }: ChatClientProps) => {
	const [messages, setMessages] = useState<ChatMessageProps[]>(
		companion.messages,
	)

	const router = useRouter()

	const { input, isLoading, handleInputChange, handleSubmit, setInput } =
		useCompletion({
			api: `/api/chat/${companion.id}`,
			onFinish(prompt, completion) {
				const systemMessage: ChatMessageProps = {
					role: 'system',
					content: completion,
				}

				setMessages((current) => [...current, systemMessage])
				setInput('')

				router.refresh()
			},
		})

	const onSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			const userMessage: ChatMessageProps = { role: 'user', content: input }

			setMessages((current) => [...current, userMessage])

			handleSubmit(e)
		},
		[handleSubmit, input],
	)

	return (
		<article className="flex h-full flex-col space-y-2 p-4">
			<ChatHeader companion={companion} />
			<ChatMessages
				companion={companion}
				isLoading={isLoading}
				messages={messages}
			/>
			<ChatForm
				isLoading={isLoading}
				input={input}
				handleInputChange={handleInputChange}
				onSubmit={onSubmit}
			/>
		</article>
	)
}
