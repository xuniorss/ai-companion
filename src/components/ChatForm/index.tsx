'use client'

import { ChatRequestOptions } from 'ai'
import { SendHorizonal } from 'lucide-react'
import { ChangeEvent, FormEvent } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface ChatFormProps {
	input: string
	handleInputChange: (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
	) => void
	onSubmit: (
		e: FormEvent<HTMLFormElement>,
		chatRequestOptions?: ChatRequestOptions | undefined,
	) => void
	isLoading: boolean
}

export const ChatForm = ({
	input = '',
	handleInputChange,
	onSubmit,
	isLoading = false,
}: ChatFormProps) => {
	return (
		<form
			onSubmit={onSubmit}
			className="flex items-center gap-x-2 border-t border-primary/10 py-4"
		>
			<Input
				disabled={isLoading}
				value={input}
				onChange={handleInputChange}
				placeholder="Digite uma mensagem"
				className="rounded-lg bg-primary/10"
			/>
			<Button
				aria-label="button send a message"
				disabled={isLoading}
				variant="ghost"
			>
				<SendHorizonal className="h-6 w-6" />
			</Button>
		</form>
	)
}