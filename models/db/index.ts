import { DataSource } from "typeorm";
import "reflect-metadata";

import { env } from "@/envs.mjs";
import { User } from "../user.entity";
import { Comment } from "../comment.entity";
import { Booking } from "../booking.entity";
import { Place } from "../place.entity";

export const AppDataSource = new DataSource({
	driver: require("pg"),
	type: "postgres",
	host: env.DB_HOST,
	database: env.DB_NAME,
	port: Number(env.DB_PORT),
	username: env.DB_USER,
	password: env.DB_PASSWORD,
	entities: [Place, Booking, User, Comment],
	synchronize: true,
	logging: process.env.NODE_ENV !== "development",
	extra: {
		ssl: {
			rejectUnauthorized: process.env.NODE_ENV === "production",
		},
	},
}).initialize();
