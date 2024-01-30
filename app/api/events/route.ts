import { revalidatePath } from "next/cache";

import { currentUser } from "@/lib/auth/current-user";
import { Booking } from "@/models/booking.entity";
import { AppDataSource } from "@/models/db";
import { Place } from "@/models/place.entity";
import { eventSchema } from "@/schemas";

export const DELETE = async (req: Request) => {
	const body = (await req.json()) as Booking;

	const { bookingDate, place, spots } = body;

	const bookingRepository = (await AppDataSource).getRepository(Booking);
	const placeRepository = (await AppDataSource).getRepository(Place);

	await placeRepository.increment({ name: place }, "availability", spots);

	const affected = await bookingRepository.delete({
		bookingDate,
		place,
		spots,
	});

	if (affected.affected === 1) {
		revalidatePath("/");
		return Response.json("Evento eliminado correctamente", { status: 200 });
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else {
		return Response.json("Error al eliminar el evento", { status: 500 });
	}
};

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

	const { eventDate, participants, place, description } = data.data;

	const bookingRepository = (await AppDataSource).getRepository(Booking);
	const placeRepository = (await AppDataSource).getRepository(Place);

	const eventPlace = await Place.findOne({
		where: {
			name: place,
		},
	});

	if (eventPlace === null) {
		return Response.json("No se encontró el lugar", { status: 404 });
	}

	const existingEvent = await bookingRepository.findOne({
		where: {
			bookingDate: eventDate,
		},
	});

	if (existingEvent) {
		return Response.json("Ya hay un evento en la misma fecha", {
			status: 400,
		});
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
	booking.description = description;
	booking.organizer = body.email;
	const savedEvent = await bookingRepository.save(booking);

	revalidatePath("/");

	return Response.json(savedEvent, { status: 201 });
};

export const GET = async () => {
	const user = await currentUser();

	const bookings = (
		await (
			await AppDataSource
		).manager.findBy(Booking, { organizer: user?.email as string })
	).map((booking) => booking);

	return Response.json(bookings, { status: 200 });
};
