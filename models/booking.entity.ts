import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Booking {
	@PrimaryGeneratedColumn("increment")
	id: string;

	@Column({ type: "varchar", nullable: false })
	place: string;

	@Column({ type: "date", nullable: false })
	bookingDate: Date;

	@Column({ type: "smallint", nullable: true })
	rating?: number;

	@Column({ type: "int", nullable: false })
	spots: number;

	@ManyToOne(() => User, ({ id }) => id)
	user: User["id"];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
