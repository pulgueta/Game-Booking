import { AppDataSource } from "@/models/db";
import { User } from "@/models/user.entity";

export const getUserByEmail = async (email: string) => {
	const userRepository = (await AppDataSource).getRepository(User);

	const user = await userRepository.findOneBy({
		email,
	});

	return user;
};
