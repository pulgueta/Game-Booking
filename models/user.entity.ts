import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from "typeorm";

import { Comment } from "./comment.entity";
import { Booking } from "./booking.entity";

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", nullable: false })
	name: string;

	@Column({ type: "varchar", nullable: false })
	email: string;

	@Column({ type: "varchar", nullable: false })
	password: string;

	@OneToMany(() => Comment, (comment) => comment)
	comments?: Comment[];

	@OneToMany(() => Booking, (booking) => booking)
	bookings?: Booking[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
