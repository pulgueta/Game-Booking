import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Place {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", nullable: false })
	name: string;

	@Column({ type: "int", nullable: false })
	availability: number;
}
