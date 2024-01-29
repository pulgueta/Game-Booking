import { Place } from "@/models/place.entity";
import { AppDataSource } from "@/models/db";
import { placeSchema } from "@/schemas";

export const POST = async (req: Request) => {
	const body = await req.json();

	const values = placeSchema.safeParse(body);

	if (!values.success) {
		return Response.json(
			{ error: values.error.flatten().fieldErrors },
			{ status: 400 }
		);
	}

	const { availability, name } = values.data;

	const placeRepository = (await AppDataSource).getRepository(Place);
	const place = new Place();
	place.name = name;
	place.availability = availability;

	const savedPlace = await placeRepository.save(place);

	return Response.json(savedPlace, { status: 201 });
};
