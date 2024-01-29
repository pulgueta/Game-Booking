"use server";

import { revalidatePath } from "next/cache";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { loginSchema } from "@/schemas";
import { getUserByEmail } from "@/lib/auth/get-user-by-id";

type Login =
	| {
			success: boolean;
			message: string;
	  }
	| undefined;

export const login = async (_prev: Login, formData: FormData) => {
	const values = loginSchema.safeParse(
		Object.fromEntries(formData.entries())
	);

	if (!values.success)
		return {
			success: false,
			message: "Campos inválidos",
		};

	const { email, password } = values.data;

	const user = await getUserByEmail(email);

	if (user === null) {
		return {
			success: false,
			message: "El usuario no existe",
		};
	}

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: "/",
		});
		revalidatePath("/login");
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return {
						success: false,
						message: "Credenciales incorrectas",
					};
				default:
					return {
						success: false,
						message: "Algo salió mal, intenta nuevamente",
					};
			}
		}

		throw error;
	}
};
