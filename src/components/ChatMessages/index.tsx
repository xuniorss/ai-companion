'use client'

import { Companion } from '@prisma/client'
import { ElementRef, useEffect, useRef, useState } from 'react'
import { ChatMessage, ChatMessageProps } from '../ChatMessage'

interface ChatMessagesProps {
	messages: ChatMessageProps[]
	isLoading: boolean
	companion: Companion
}

export const ChatMessages = ({
	messages = [],
	isLoading = false,
	companion,
}: ChatMessagesProps) => {
	const [fakeLoading, setFakeLoading] = useState(
		messages.length === 0 ? true : false,
	)

	const scrollRef = useRef<ElementRef<'div'>>(null)

	useEffect(() => {
		const timeout = setTimeout(() => setFakeLoading(false), 1000)
		return () => clearTimeout(timeout)
	}, [])

	useEffect(
		() => scrollRef?.current?.scrollIntoView({ behavior: 'smooth' }),
		[messages.length],
	)

	return (
		<section className="flex-1 overflow-y-auto pr-4">
			<ChatMessage
				isLoading={fakeLoading}
				src={companion.src}
				role="system"
				content={`Olá, eu sou ${companion.name},  ${companion.description}`}
			/>
			{messages.map((message) => (
				<ChatMessage
					key={message.content}
					role={message.role}
					content={message.content}
					src={companion.src}
				/>
			))}
			{isLoading && (
				<ChatMessage role="system" src={companion.src} isLoading />
			)}
			<div ref={scrollRef} />
		</section>
	)
}
