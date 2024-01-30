import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";

import { loginSchema } from "./schemas";
import { UserEntity } from "./models/user.entity";

export default {
	providers: [
		Credentials({
			authorize: async (credentials) => {
				const validatedFields = loginSchema.safeParse(credentials);

				if (validatedFields.success) {
					const { email, password } = validatedFields.data;

					const user = await UserEntity.findOneBy({
						email,
					});

					if (!user || !user.password) return null;

					const passwordsMatch = await compare(
						password,
						user.password
					);

					if (passwordsMatch) return user;
				}

				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
