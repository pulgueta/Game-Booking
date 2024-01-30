import { getPlaces } from "@/lib/data/get-data";

export const GET = async () => {
	const places = (await getPlaces()).sort(
		(a, b) => b.availability - a.availability
	);

	return Response.json(places, { status: 200 });
};
