import { bookingRepository, placeRepository } from "@/models/db/repositories";

export const getPlaces = async () => {
	const places = await placeRepository.find();

	return places.map((places) => places);
};

export const getBookingsById = async (email: string) => {
	const bookings = await bookingRepository.findBy({
		organizer: email,
	});

	return bookings.map((booking) => booking);
};

export const getBookings = async () => {
	const bookings = await bookingRepository.find();

	return bookings.map((booking) => booking);
};
