import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getPlaces } from "@/lib/data/get-data";
import { rscFetch } from "@/lib/utils";
import { PlacesAvailability } from "./table-body";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const Availability = async () => {
	const places = await rscFetch<typeof getPlaces>("/api/places");

	return (
		<div className='border p-4 rounded w-full bg-secondary/50 md:col-span-2 lg:col-span-1'>
			<h3 className='text-2xl font-semibold tracking-tight mb-4'>
				Disponibilidad de lugares
			</h3>

			<Table className='border rounded'>
				<TableHeader>
					<TableRow>
						<TableHead className='w-full'>Lugar</TableHead>
						<TableHead className='text-right'>Sitios</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<PlacesAvailability places={places} />
				</TableBody>
			</Table>
		</div>
	);
};
export default Availability;
