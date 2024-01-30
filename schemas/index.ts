import { TypeOf, coerce, number, object, string } from "zod";

export const loginSchema = object({
	email: string()
		.email("Ingresa un correo válido")
		.min(4, "Tu email debe tener al menos 4 caracteres"),
	password: string().min(4, "Tu contraseña debe tener al menos 4 caracteres"),
});

export type Login = TypeOf<typeof loginSchema>;

export const registerSchema = object({
	name: string().min(4, "Tu nombre debe tener al menos 4 caracteres"),
	email: string()
		.email("Ingresa un correo válido")
		.min(4, "Tu email debe tener al menos 4 caracteres"),
	password: string().min(4, "Tu contraseña debe tener al menos 4 caracteres"),
});

export type Register = TypeOf<typeof registerSchema>;

export const placeSchema = object({
	name: string().min(
		4,
		"El nombre del lugar debe tener al menos 4 caracteres"
	),
	availability: number({
		invalid_type_error: "Debes ingresar un número",
		required_error: "Debes ingresar un número de sitios disponibles",
	}),
});

export type Place = TypeOf<typeof placeSchema>;

export const eventSchema = object({
	place: string().min(4, "Debes escoger un lugar"),
	eventDate: coerce
		.date({
			required_error: "Debes ingresar una fecha",
			invalid_type_error: "Ingresa una fecha válida",
		})

		.min(new Date(), "No puedes ingresar una fecha anterior a hoy"),
	description: string().min(
		4,
		"El descripción del evento debe tener al menos 4 caracteres"
	),
	participants: coerce
		.number({ required_error: "Debes ingresar los participantes" })
		.min(5, "El evento debe tener al menos 5 participantes")
		.nonnegative("El número de participantes no puede ser negativo")
		.int("El número de participantes no puede ser decimal"),
});

export type Event = TypeOf<typeof eventSchema>;

export const ratingSchema = object({
	rating: string().min(4, "Debes escoger una calificación"),
	opinion: string().min(4, "La opinión debe tener al menos 4 caracteres"),
});

export type Rating = TypeOf<typeof ratingSchema>;
