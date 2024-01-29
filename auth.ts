import NextAuth from "next-auth";
import { TypeORMAdapter } from "@auth/typeorm-adapter";

import authConfig from "@/auth.config";
import { env } from "./envs.mjs";

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
	unstable_update: update,
} = NextAuth({
	pages: {
		signIn: "/auth/login",
		error: "/auth/error",
	},
	adapter: TypeORMAdapter(env.DATABASE_URL),
	session: { strategy: "jwt" },
	secret: env.AUTH_SECRET,
	...authConfig,
});
