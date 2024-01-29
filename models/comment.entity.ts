import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	ManyToOne,
} from "typeorm";

// import { User } from "./user.entity";
import { Booking } from "./booking.entity";

@Entity()
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", nullable: false })
	comment: string;

	@Column({ type: "smallint", nullable: false })
	rating: number;

	@Column({ type: "uuid" })
	userId: string;

	@ManyToOne(() => Booking, ({ place }) => place)
	place: Booking["place"];

	// @ManyToOne(() => User, ({ comments }) => comments)
	// user: User;

	@CreateDateColumn()
	createdAt: Date;
}
