import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { getBookings } from "@/lib/data/get-data";
import { rscFetch } from "@/lib/utils";
import { Bookings } from "./table-body";

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
					<Bookings prevBookings={bookings} />
				</TableBody>
			</Table>
		</div>
	);
};
export default Booking;
