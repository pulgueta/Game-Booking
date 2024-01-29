import { currentUser } from "@/lib/auth/current-user";
import { Booking } from "@/models/booking.entity";
import { AppDataSource } from "@/models/db";

export const GET = async () => {
	const user = await currentUser();

	if (user === null) {
		return Response.json("Unauthorized", { status: 401 });
	}

	(await AppDataSource).getRepository(Booking).remove;
};
