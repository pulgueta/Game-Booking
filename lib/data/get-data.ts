import { Booking } from "@/models/booking.entity";
import { AppDataSource } from "@/models/db";
import { Place } from "@/models/place.entity";

export const getPlaces = async () => {
	const placeRepository = (await AppDataSource).getRepository(Place);

	const places = await placeRepository.find();

	return places.map((places) => places);
};

export const getBookingsById = async (email: string) => {
	const bookingRepository = (await AppDataSource).getRepository(Booking);

	const bookings = await bookingRepository.findBy({
		organizer: email,
	});

	return bookings.map((booking) => booking);
};

export const getBookings = async () => {
	const bookingRepository = (await AppDataSource).getRepository(Booking);

	const bookings = await bookingRepository.find();

	return bookings.map((booking) => booking);
};
