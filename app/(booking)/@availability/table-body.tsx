"use client";

import { FC, useEffect, useState } from "react";

import { pusherClient } from "@/pusher";
import { TableCell, TableRow } from "@/components/ui/table";

import { Place } from "@/models/place.entity";

type TableBookings = {
	places: Place[];
};

export const PlacesAvailability: FC<TableBookings> = ({ places }) => {
	const [prevPlaces, setPrevPlaces] = useState(places);

	useEffect(() => {
		const pusher = pusherClient.subscribe("place");
		pusher.bind("placeAvailability", (data: any) => {
			const pusherPlaces = data.places;

			setPrevPlaces(() => [...pusherPlaces]);
		});

		return () => {
			pusherClient.unsubscribe("booking");
		};
	}, []);

	return prevPlaces.map((place) => (
		<TableRow key={place.id}>
			<TableCell className='font-medium'>{place.name}</TableCell>
			<TableCell className='text-right'>{place.availability}</TableCell>
		</TableRow>
	));
};
