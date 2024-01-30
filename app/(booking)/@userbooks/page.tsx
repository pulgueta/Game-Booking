import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getBookingsById } from "@/lib/data/get-data";
import { rscFetch } from "@/lib/utils";
import { ActionButtons } from "./_components/action-buttons";
import { currentUser } from "@/lib/auth/current-user";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const UserBooks = async () => {
	const userPromise = currentUser();
	const bookingsPromise = rscFetch<typeof getBookingsById>("/api/events");

	const [user, bookings] = await Promise.all([userPromise, bookingsPromise]);

	const userBookings = bookings.filter(
		(booking) => booking.organizer === user?.email
	);

	return (
		<aside className='border p-4 rounded w-full bg-secondary/50 md:col-span-1 lg:col-span-1'>
			<h3 className='text-2xl font-semibold tracking-tight mb-4'>
				Mis reservas
			</h3>

			<Table className='border rounded'>
				<TableHeader>
					<TableRow>
						<TableHead className='text-center'>Lugar</TableHead>
						<TableHead className='text-center'>
							Descripción
						</TableHead>
						<TableHead className='text-center'>Fecha</TableHead>
						<TableHead className='text-center'>Sitios</TableHead>
						<TableHead className='text-center'>Acciones</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{userBookings.length > 0 &&
						userBookings.map((booking) => (
							<TableRow key={booking.id}>
								<TableCell className='text-center font-medium'>
									{booking.place}
								</TableCell>
								<TableCell className='text-center font-medium truncate'>
									{booking.description}
								</TableCell>
								<TableCell className='text-center font-medium'>
									{new Date(
										booking.bookingDate
									).toLocaleDateString()}
								</TableCell>
								<TableCell className='text-center font-medium'>
									{booking.spots}
								</TableCell>
								<TableCell className='font-medium flex items-center gap-4 justify-center'>
									<ActionButtons {...booking} />
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</aside>
	);
};
export default UserBooks;
