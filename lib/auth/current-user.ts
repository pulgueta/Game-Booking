import { User } from "next-auth";

import { auth } from "@/auth";

export const currentUser = async (): Promise<User | null> => {
	const session = await auth();

	if (!session?.user) return null;

	return session.user;
};
