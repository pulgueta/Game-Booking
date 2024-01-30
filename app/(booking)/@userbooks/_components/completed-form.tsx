"use client";

import { FC } from "react";

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { ratingSchema, Rating } from "@/schemas";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ratings } from "@/lib/utils";
import { Booking } from "@/models/booking.entity";

type CompleteForm = {
	booking: Booking;
};

export const CompletedForm: FC<CompleteForm> = ({ booking }) => {
	const { refresh } = useRouter();

	const { data: user } = useSession();

	const form = useForm<Rating>({
		resolver: zodResolver(ratingSchema),
		defaultValues: {
			opinion: "",
			rating: "",
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		const res = await fetch("/api/rating", {
			method: "POST",
			body: JSON.stringify({
				...data,
				...booking,
				organizer: user?.user?.email,
			}),
		});

		const jsonRes = await res.json();

		if (!res.ok) {
			toast.error(jsonRes);
			return;
		}

		refresh();
		toast.success("Gracias por tu opinión");
		form.reset();
		form.clearErrors();
	});

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className='space-y-6'>
				<FormField
					control={form.control}
					name='opinion'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Tu comentario</FormLabel>
							<Textarea
								placeholder='Deja tu opinión acerca de la organización del evento'
								disabled={form.formState.isSubmitting}
								{...field}
							/>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='rating'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Calificación</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Selecciona una calificación' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{ratings.map((rating) => (
										<SelectItem
											value={rating.label}
											key={rating.label}
										>
											{rating.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					className='w-full'
					disabled={form.formState.isSubmitting}
				>
					{form.formState.isSubmitting ? (
						<Loader2Icon className='size-4 animate-spin' />
					) : (
						"Calificar evento"
					)}
				</Button>
			</form>
		</Form>
	);
};
