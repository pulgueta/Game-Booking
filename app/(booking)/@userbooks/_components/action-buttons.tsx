"use client";

import { FC, useTransition } from "react";

import { useRouter } from "next/navigation";

import { CheckIcon, LoaderIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Booking } from "@/models/booking.entity";

export const ActionButtons: FC<Booking> = (booking) => {
	const [pending, startTransition] = useTransition();

	const disabled = new Date() < new Date(booking.bookingDate);

	const { refresh } = useRouter();

	const onDeleteEvent = (booking: Booking) =>
		startTransition(async () => {
			const res = await fetch("/api/events", {
				method: "DELETE",
				body: JSON.stringify(booking),
			});

			if (!res.ok) {
				toast.error("Error al eliminar el evento");
				return;
			}

			const data = await res.json();

			toast.success(data);
			refresh();
		});

	return (
		<TooltipProvider delayDuration={300}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						disabled={disabled}
						aria-label='Evento terminado'
						size='icon'
						className='size-6'
					>
						<CheckIcon className='size-4' />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Evento finalizado</p>
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						aria-label={
							pending ? "Cancelando evento" : "Cancelar evento"
						}
						size='icon'
						className='size-6'
						variant='destructive'
						disabled={pending}
						onClick={() => onDeleteEvent(booking)}
					>
						{pending ? (
							<LoaderIcon className='size-4 animate-spin' />
						) : (
							<TrashIcon className='size-4' />
						)}
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Cancelar evento</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
