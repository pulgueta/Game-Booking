"use client";

import { FC, useEffect, useState } from "react";

import { Booking } from "@/models/booking.entity";
import { pusherClient } from "@/pusher";
import { TableCell, TableRow } from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";

type TableBookings = {
	prevBookings: Booking[];
};

export const Bookings: FC<TableBookings> = ({ prevBookings }) => {
	const [bookings, setBookings] = useState(prevBookings);

	useEffect(() => {
		const pusher = pusherClient.subscribe("booking");
		pusher.bind("bookingChange", (data: any) => {
			const pusherBookings = data.booking;

			setBookings(() => [...pusherBookings]);
		});

		return () => {
			pusherClient.unsubscribe("booking");
		};
	}, []);

	return bookings.map((booking) => (
		<TableRow key={booking.id}>
			<TableCell className='text-center'>{booking.place}</TableCell>
			<TableCell className='text-center'>{booking.description}</TableCell>
			<TableCell className='text-center'>
				{new Date(booking.bookingDate).toLocaleDateString("es-CO", {
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
			<TableCell className='text-center'>{booking.spots}</TableCell>
		</TableRow>
	));
};
