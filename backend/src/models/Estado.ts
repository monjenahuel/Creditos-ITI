import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Estado{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    descripcion: string;

    constructor(id:number, descripcion: string) {
        this.id = id;
        this.descripcion = descripcion;
     }
}