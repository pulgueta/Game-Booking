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

export const revalidate = 0;
export const dynamic = "force-dynamic";

const UserBooks = async () => {
	const bookings = await rscFetch<
		Awaited<ReturnType<typeof getBookingsById>>
	>("/api/events");

	return (
		<aside className='border p-4 rounded w-full bg-secondary/50 md:col-span-2 lg:col-span-1'>
			<h3 className='text-2xl font-semibold tracking-tight'>
				Mis reservas
			</h3>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='text-center'>Lugar</TableHead>
						<TableHead className='text-center'>Fecha</TableHead>
						<TableHead className='text-center'>Sitios</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{bookings.map((booking) => (
						<TableRow key={booking.id}>
							<TableCell className='text-center font-medium'>
								{booking.place}
							</TableCell>
							<TableCell className='text-center font-medium'>
								{new Date(
									booking.bookingDate
								).toLocaleDateString()}
							</TableCell>
							<TableCell className='text-center font-medium'>
								{booking.spots}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</aside>
	);
};
export default UserBooks;
