import { createEnv } from "@t3-oss/env-core";
import { boolean, string } from "zod";

export const env = createEnv({
	server: {
		HOST: string().url(),
		DATABASE_URL: string().url(),
		DB_HOST: string().min(4),
		DB_NAME: string().min(4),
		DB_PORT: string().refine((value) => {
			const portNumber = parseInt(value, 10);
			return !Number.isNaN(portNumber) && portNumber > 0 && portNumber <= 65535;
		}, {
			message: "DB_PORT must be a valid port number between 1 and 65535",
		}),
		DB_USER: string().min(4),
		DB_PASSWORD: string().min(4),
		AUTH_SECRET: string().min(32),
		PUSHER_APPID: string().min(4),
		PUSHER_KEY: string().min(4),
		PUSHER_SECRET: string().min(4),
		PUSHER_CLUSTER: string().min(2),
		PUSHER_TLS: string().toLowerCase().transform((x) => x === 'true').pipe(boolean()),
	},
	runtimeEnv: {
		HOST: process.env.HOST,
		DATABASE_URL: process.env.DATABASE_URL,
		DB_HOST: process.env.DB_HOST,
		DB_TYPE: process.env.DB_TYPE,
		DB_NAME: process.env.DB_NAME,
		DB_PORT: process.env.DB_PORT,
		DB_USER: process.env.DB_USER,
		DB_PASSWORD: process.env.DB_PASSWORD,
		AUTH_SECRET: process.env.AUTH_SECRET,
		PUSHER_APPID: process.env.PUSHER_APPID,
		PUSHER_KEY: process.env.PUSHER_KEY,
		PUSHER_SECRET: process.env.PUSHER_SECRET,
		PUSHER_CLUSTER: process.env.PUSHER_CLUSTER,
		PUSHER_TLS: process.env.PUSHER_TLS,
	},
});
