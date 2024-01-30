import { revalidatePath } from "next/cache";

import { Booking } from "@/models/booking.entity";
import { AppDataSource } from "@/models/db";
import { Place } from "@/models/place.entity";
import { Comment } from "@/models/comment.entity";
import { ratingSchema } from "@/schemas";
import { pusherServer } from "@/pusher";

export const POST = async (req: Request) => {
	const body = await req.json();

	const values = ratingSchema.safeParse(body);
	const { bookingDate, place, spots, organizer } = body;

	if (!values.success) {
		return Response.json(
			{ error: values.error.flatten().fieldErrors },
			{ status: 400 }
		);
	}

	const { opinion, rating } = values.data;

	const bookingRepository = (await AppDataSource).getRepository(Booking);
	const placeRepository = (await AppDataSource).getRepository(Place);
	const commentRepository = (await AppDataSource).getRepository(Comment);

	const comment = new Comment();
	comment.comment = opinion;
	comment.rating = rating;
	comment.organizer = organizer;
	await commentRepository.save(comment);

	await placeRepository.increment({ name: place }, "availability", spots);

	const affected = await bookingRepository.delete({
		bookingDate,
		place,
		spots,
	});

	pusherServer.trigger("booking", "bookingChange", {
		booking: await bookingRepository.find(),
	});

	await pusherServer.trigger("place", "placeAvailability", {
		places: await placeRepository.find(),
	});

	if (affected.affected === 1) {
		revalidatePath("/");
		return Response.json("Evento eliminado correctamente", { status: 200 });
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else {
		return Response.json("Error al eliminar el evento", { status: 500 });
	}
};
