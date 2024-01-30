import { buttonVariants } from "@/components/ui/button";
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

export const revalidate = 0;
export const dynamic = "force-dynamic";

const Booking = async () => {
	const bookings = await rscFetch<typeof getBookings>("/api/events");

	return (
		<div className='border p-4 rounded w-full bg-secondary/50 md:col-span-2 lg:col-span-3'>
			<h3 className='text-2xl font-semibold tracking-tight mb-4'>
				Próximos eventos
			</h3>

			<Table className='border rounded'>
				<TableHeader>
					<TableRow>
						<TableHead className='text-center'>
							Lugar del evento
						</TableHead>
						<TableHead className='text-center'>
							Descripción del evento
						</TableHead>
						<TableHead className='text-center'>
							Fecha del evento
						</TableHead>
						<TableHead className='text-center'>
							Correo del organizador
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
								{booking.description}
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
								<a
									href={`mailto:${booking.organizer}`}
									className={buttonVariants({
										variant: "link",
									})}
								>
									{booking.organizer}
								</a>
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
