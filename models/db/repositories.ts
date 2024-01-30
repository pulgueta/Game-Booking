import { AppDataSource } from ".";
import { Booking } from "../booking.entity";
import { Comment } from "../comment.entity";
import { Place } from "../place.entity";

export const bookingRepository = (await AppDataSource).getRepository(Booking);
export const placeRepository = (await AppDataSource).getRepository(Place);
export const commentRepository = (await AppDataSource).getRepository(Comment);
