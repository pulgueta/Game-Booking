import { revalidatePath } from "next/cache";

import { Comment } from "@/models/comment.entity";
import { ratingSchema } from "@/schemas";
import { pusherServer } from "@/pusher";
import {
	bookingRepository,
	commentRepository,
	placeRepository,
} from "@/models/db/repositories";
import { getBookings, getPlaces } from "@/lib/data/get-data";

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
		booking: await getBookings(),
	});

	await pusherServer.trigger("place", "placeAvailability", {
		places: await getPlaces(),
	});

	if (affected.affected === 1) {
		revalidatePath("/");
		return Response.json("Evento eliminado correctamente", { status: 200 });
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else {
		return Response.json("Error al eliminar el evento", { status: 500 });
	}
};
