"use client";

import { FC } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getPlaces } from "@/lib/data/get-data";
import { Event, eventSchema } from "@/schemas";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";

type EventPlaces = {
	places: Awaited<ReturnType<typeof getPlaces>>;
	email: string;
};

export const CreateEventForm: FC<EventPlaces> = ({ places, email }) => {
	const { refresh } = useRouter();

	const form = useForm<Event>({
		resolver: zodResolver(eventSchema),
		defaultValues: {
			eventDate: undefined,
			participants: 0,
			place: "",
			description: "",
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		const res = await fetch("/api/events", {
			method: "POST",
			body: JSON.stringify({ ...data, email }),
		});

		const jsonRes = await res.json();

		if (!res.ok) {
			toast.error(jsonRes);
			return;
		}

		refresh();
		toast.success("Se ha creado tu evento con éxito");
		form.reset();
		form.clearErrors();
	});

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className='space-y-6'>
				<FormField
					control={form.control}
					name='place'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Lugar del evento</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
								disabled={form.formState.isSubmitting}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='¿Dónde quieres realizar tu evento?' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{places.map((place) => (
										<SelectItem
											key={place.id}
											value={place.name}
										>
											{place.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='eventDate'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Fecha del evento</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-full pl-3 text-left font-normal",
												!field.value &&
													"text-muted-foreground"
											)}
											disabled={
												form.formState.isSubmitting
											}
										>
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>
													Selecciona una fecha
												</span>
											)}
											<CalendarIcon className='ml-auto size-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent
									className='w-auto p-0'
									align='start'
								>
									<Calendar
										mode='single'
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) => date < new Date()}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='participants'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Número de participantes</FormLabel>
							<Input
								type='number'
								disabled={form.formState.isSubmitting}
								{...field}
							/>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Descripción del evento</FormLabel>
							<Textarea
								placeholder='¿Qué ocurrirá en el evento?'
								disabled={form.formState.isSubmitting}
								{...field}
							/>
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
						"Crear evento"
					)}
				</Button>
			</form>
		</Form>
	);
};
