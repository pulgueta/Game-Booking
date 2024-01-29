import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getPlaces } from "@/lib/data/get-data";
import { rscFetch } from "@/lib/utils";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const Availability = async () => {
	const places = await rscFetch<Awaited<ReturnType<typeof getPlaces>>>(
		"/api/places"
	);

	return (
		<div className='border p-4 rounded w-full bg-secondary/50'>
			<h3 className='text-2xl font-semibold tracking-tight'>
				Disponibilidad de lugares
			</h3>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='w-full'>Lugar</TableHead>
						<TableHead className='text-right'>Sitios</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{places.map((place) => (
						<TableRow key={place.id}>
							<TableCell className='font-medium'>
								{place.name}
							</TableCell>
							<TableCell className='text-right'>
								{place.availability}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
export default Availability;
