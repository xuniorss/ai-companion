// Set the typing of your environment variables here 👇
type MyVariables = {
	NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string
	CLERK_SECRET_KEY: string
	NEXT_PUBLIC_CLERK_SIGN_IN_URL: string
	NEXT_PUBLIC_CLERK_SIGN_UP_URL: string
	NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: string
	NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: string
	PINECONE_INDEX: string
	PINECONE_ENVIRONMENT: string
	PINECONE_API_KEY: string
	UPSTASH_REDIS_REST_URL: string
	UPSTASH_REDIS_REST_TOKEN: string
	OPENAI_API_KEY: string
	REPLICATE_API_TOKEN: string
}

declare global {
	namespace NodeJS {
		interface ProcessEnv extends MyVariables {}
	}
}

export {}
