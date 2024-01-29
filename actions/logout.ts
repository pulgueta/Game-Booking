"use server";

import { revalidatePath } from "next/cache";

import { signOut } from "@/auth";

export const logout = async () => {
	await signOut({ redirectTo: "/login", redirect: true });
	revalidatePath("/");
};
