import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	ValueTransformer,
} from "typeorm";

import { Comment } from "./comment.entity";
import { Booking } from "./booking.entity";

const transformer: Record<"date" | "bigint", ValueTransformer> = {
	date: {
		from: (date: string | null) => date && new Date(parseInt(date, 10)),
		to: (date?: Date) => date?.valueOf().toString(),
	},
	bigint: {
		from: (bigInt: string | null) => bigInt && parseInt(bigInt, 10),
		to: (bigInt?: number) => bigInt?.toString(),
	},
};

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", nullable: false })
	name: string;

	@Column({ type: "varchar", nullable: false, unique: true })
	email: string;

	@Column({ type: "varchar", nullable: false })
	password: string;

	@Column({ type: "varchar", nullable: true, transformer: transformer.date })
	emailVerified!: string | null;

	@Column({ type: "varchar", nullable: true })
	image!: string | null;

	@OneToMany(() => Comment, (comment) => comment, {
		nullable: true,
		cascade: ["remove"],
	})
	comments: Comment[];

	@OneToMany(() => Booking, (booking) => booking.organizer, {
		nullable: true,
		cascade: ["remove"],
	})
	bookings: Booking[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
