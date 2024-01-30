"use client";

import { FC, useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { CheckIcon, Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Booking } from "@/models/booking.entity";
import { CompletedForm } from "./completed-form";

type CompleteDialog = {
	disabled: boolean;
	booking: Booking;
};

export const CompleteDialog: FC<CompleteDialog> = ({ booking, disabled }) => {
	const [open, setOpen] = useState(false);
	const [pending, startTransition] = useTransition();

	const { refresh } = useRouter();

	const onCloseEvent = () =>
		startTransition(async () => {
			const res = await fetch("/api/events", {
				method: "DELETE",
				body: JSON.stringify(booking),
			});

			const jsonRes = await res.json();

			if (!res.ok) {
				toast.error(jsonRes);
				return;
			}

			refresh();
			toast.success("Gracias por participar en el evento");
			setOpen(false);
		});

	return (
		<Dialog open={open} onOpenChange={(e) => setOpen(e)}>
			<DialogTrigger asChild>
				<Button
					disabled={disabled}
					aria-label='Evento terminado'
					size='icon'
					className='size-6'
					onClick={() => setOpen(true)}
				>
					<CheckIcon className='size-4' />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>¿Tienes algo por añadir?</DialogTitle>
					<DialogDescription>
						Puedes dejar tu opinión acerca de tu experiencia y una
						valoración, es completamente opcional.
					</DialogDescription>
				</DialogHeader>
				<CompletedForm booking={booking} />
				<DialogFooter>
					<Button
						className='w-full'
						variant='destructive'
						onClick={onCloseEvent}
						disabled={pending}
					>
						{pending ? (
							<Loader2Icon className='size-4 animate-spin' />
						) : (
							"No calificar"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
