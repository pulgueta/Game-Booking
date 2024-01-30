import { getPlaces } from "@/lib/data/get-data";
import { rscFetch } from "@/lib/utils";
import { CreateEventForm } from "./components/form/create-event-form";
import { currentUser } from "@/lib/auth/current-user";

const Booking = async () => {
	const userPromise = currentUser();
	const placesPromise = rscFetch<typeof getPlaces>("/api/places");

	const [user, places] = await Promise.all([userPromise, placesPromise]);

	return (
		<article className='border p-4 rounded w-full bg-secondary/50'>
			<h3 className='text-2xl font-semibold tracking-tight mb-4'>
				Crear nuevo evento
			</h3>
			<CreateEventForm places={places} email={user?.email as string} />
		</article>
	);
};
export default Booking;
