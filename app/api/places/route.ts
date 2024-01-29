import { AppDataSource } from "@/models/db";
import { Place } from "@/models/place.entity";

export const GET = async () => {
	const placeRepository = (await AppDataSource).getRepository(Place);

	const places = (await placeRepository.find()).map(
		({ availability, id, name }) => ({
			availability,
			id,
			name,
		})
	);

	return Response.json(places, { status: 200 });
};
