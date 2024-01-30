import { AppDataSource } from ".";
import { Booking } from "../booking.entity";
import { Comment } from "../comment.entity";
import { Place } from "../place.entity";
import { UserEntity } from "../user.entity";

export const bookingRepository = (await AppDataSource).getRepository(Booking);
export const placeRepository = (await AppDataSource).getRepository(Place);
export const commentRepository = (await AppDataSource).getRepository(Comment);
export const userRepository = (await AppDataSource).getRepository(UserEntity);
