import { getPlaces } from "@/lib/data/get-data";
import { CreateEventForm } from "./components/form/create-event-form";

const Booking = async () => {
	const places = await getPlaces();

	return (
		<article className='border p-4 rounded w-full bg-secondary/50'>
			<h3 className='text-2xl font-semibold tracking-tight mb-4'>
				Crear nuevo evento
			</h3>
			<CreateEventForm places={places} />
		</article>
	);
};
export default Booking;
