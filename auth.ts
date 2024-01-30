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
		signIn: "/login",
		newUser: "/register",
	},
	adapter: TypeORMAdapter(env.DB_HOST),
	session: { strategy: "jwt" },
	secret: env.AUTH_SECRET,
	debug: process.env.NODE_ENV === "development",
	useSecureCookies: process.env.NODE_ENV === "production",
	...authConfig,
});
