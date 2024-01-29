import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { getBookings } from "@/lib/data/get-data";
import { rscFetch } from "@/lib/utils";

const Booking = async () => {
	const bookings = await rscFetch<Awaited<ReturnType<typeof getBookings>>>(
		"/api/events"
	);

	return (
		<div className='border p-4 rounded w-full bg-secondary/50 md:col-span-2 lg:col-span-3'>
			<h3 className='text-2xl font-semibold tracking-tight'>
				Próximos eventos
			</h3>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='text-center'>
							Lugar del evento
						</TableHead>
						<TableHead className='text-center'>
							Fecha del evento
						</TableHead>
						<TableHead className='text-center'>
							Evento creado el día
						</TableHead>
						<TableHead className='text-center'>
							Participantes
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{bookings.map((booking) => (
						<TableRow key={booking.id}>
							<TableCell className='text-center'>
								{booking.place}
							</TableCell>
							<TableCell className='text-center'>
								{new Date(
									booking.bookingDate
								).toLocaleDateString("es-CO", {
									day: "numeric",
									month: "long",
									year: "numeric",
								})}
							</TableCell>
							<TableCell className='text-center'>
								{new Date(booking.createdAt).toLocaleDateString(
									"es-CO",
									{
										day: "numeric",
										month: "long",
										year: "numeric",
									}
								)}
							</TableCell>
							<TableCell className='text-center'>
								{booking.spots}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
export default Booking;
