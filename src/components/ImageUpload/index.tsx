'use client'

import { CldUploadButton } from 'next-cloudinary'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ImageUploadProps {
	value: string
	onChange: (src: string) => void
	disabled?: boolean
}

export const ImageUpload = ({
	value = '',
	onChange,
	disabled = false,
}: ImageUploadProps) => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => setIsMounted(true), [])

	if (!isMounted) return null

	return (
		<section className="flex w-full flex-col items-center justify-center space-y-4">
			<CldUploadButton
				onUpload={(result: any) => onChange(result.info.secure_url)}
				options={{ maxFiles: 1 }}
				uploadPreset="iu7e84dn"
			>
				<div className="flex flex-col items-center justify-center space-y-2 rounded-lg border-4 border-dashed border-primary/10 p-4 transition hover:opacity-75">
					<div className="relative h-40 w-40">
						<Image
							fill
							alt="Upload"
							src={value || '/placeholder.svg'}
							className="rounded-lg object-cover"
						/>
					</div>
				</div>
			</CldUploadButton>
		</section>
	)
}
