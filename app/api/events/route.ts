import { revalidatePath } from "next/cache";

import { currentUser } from "@/lib/auth/current-user";
import { Booking } from "@/models/booking.entity";
import { AppDataSource } from "@/models/db";
import { Place } from "@/models/place.entity";
import { eventSchema } from "@/schemas";

export const POST = async (req: Request) => {
	const user = await currentUser();

	if (user === null) {
		return Response.json("Unauthorized", { status: 401 });
	}

	const body = await req.json();

	const data = eventSchema.safeParse(body);

	if (!data.success) {
		return Response.json(data.error.flatten().fieldErrors, { status: 400 });
	}

	const { eventDate, participants, place } = data.data;

	const bookingRepository = (await AppDataSource).getRepository(Booking);
	const placeRepository = (await AppDataSource).getRepository(Place);

	const eventPlace = await placeRepository.findOne({
		where: {
			name: place,
		},
	});

	if (eventPlace === null) {
		return Response.json("No se encontró el lugar", { status: 404 });
	}

	if (eventPlace.availability < participants) {
		return Response.json("No hay suficientes espacios", { status: 400 });
	}

	eventPlace.availability -= participants;
	await placeRepository.save(eventPlace);

	const booking = new Booking();
	booking.place = place;
	booking.bookingDate = eventDate;
	booking.spots = participants;
	booking.user = user.id as string;
	const savedEvent = await bookingRepository.save(booking);

	revalidatePath("/");

	return Response.json(savedEvent, { status: 201 });
};

export const GET = async () => {
	const user = await currentUser();

	const bookingRepository = await (await AppDataSource)
		.getRepository(Booking)
		.findBy({
			user: user?.id,
		});

	return Response.json(bookingRepository, { status: 200 });
};
