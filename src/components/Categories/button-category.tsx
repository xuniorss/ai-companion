import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
	base: 'flex items-center rounded-md bg-primary/10 px-2 py-2 text-center text-xs transition hover:opacity-75 md:px-4 md:py-3 md:text-sm',
	variants: {
		bgColor: {
			default: 'bg-primary/25',
			active: 'bg-primary/10',
		},
	},
	defaultVariants: {
		bgColor: 'default',
	},
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export const ButtonCategory = ({
	bgColor,
	className,
	...props
}: ButtonProps) => {
	return (
		<button className={button({ bgColor })} {...props}>
			{props.children}
		</button>
	)
}
