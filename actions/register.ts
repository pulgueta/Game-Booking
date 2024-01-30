"use server";

import { hash } from "bcrypt";

import { UserEntity } from "@/models/user.entity";
import { registerSchema } from "@/schemas";
import { AppDataSource } from "@/models/db";
import { getUserByEmail } from "@/lib/auth/get-user-by-email";

type Register =
	| {
			success: boolean;
			message: string;
	  }
	| undefined;

export const register = async (_prev: Register, formData: FormData) => {
	const values = registerSchema.safeParse(
		Object.fromEntries(formData.entries())
	);

	if (!values.success) {
		return {
			success: false,
			message: "Datos incorrectos, vuelve a intentarlo",
		};
	}

	const { email, name, password } = values.data;

	const userRepository = (await AppDataSource).getRepository(UserEntity);

	const userExists = await getUserByEmail(email);

	if (userExists) {
		return {
			success: false,
			message: "El correo ya está en uso, intenta con uno nuevo",
		};
	}

	const hashedPassword = await hash(password, 12);

	const user = new UserEntity();
	user.name = name;
	user.password = hashedPassword;
	user.email = email;
	await userRepository.save(user);

	return {
		success: true,
		message: "Cuenta creada con éxito",
	};
};
