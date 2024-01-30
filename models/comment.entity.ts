import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	ManyToOne,
} from "typeorm";

import { Booking } from "./booking.entity";

@Entity()
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", nullable: false })
	comment: string;

	@Column({ type: "varchar", nullable: false })
	rating: string;

	@ManyToOne(() => Booking, ({ place }) => place)
	place: Booking["place"];

	@Column({ type: "varchar", nullable: false })
	organizer: string;

	@CreateDateColumn()
	createdAt: Date;
}
