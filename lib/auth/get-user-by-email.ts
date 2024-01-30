import { AppDataSource } from "@/models/db";
import { UserEntity } from "@/models/user.entity";

export const getUserByEmail = async (email: string) => {
	const user = await (
		await AppDataSource
	).manager.findOneBy(UserEntity, { email });

	return user;
};
