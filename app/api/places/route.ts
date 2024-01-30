import { AppDataSource } from "@/models/db";
import { Place } from "@/models/place.entity";

export const GET = async () => {
	const places = (await (await AppDataSource).manager.find(Place)).map(
		(place) => place
	);

	return Response.json(places, { status: 200 });
};
