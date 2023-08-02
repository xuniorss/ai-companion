import { ReactNode } from 'react'

export default function ChatIdLayout({ children }: { children: ReactNode }) {
	return <div className="mx-auto h-full w-full max-w-4xl">{children}</div>
}
