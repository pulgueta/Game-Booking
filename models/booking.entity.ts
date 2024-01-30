import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
export class Booking {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", nullable: false })
	place: string;

	@Column({ type: "varchar", nullable: false })
	description: string;

	@Column({ type: "date", nullable: false })
	bookingDate: Date;

	@Column({ type: "int", nullable: false })
	spots: number;

	@Column({ type: "varchar", nullable: false })
	organizer: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
