import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Actividad } from "./Actividad";

@Entity()
export class Carrera {
    constructor() { }

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    nombre: string;

    @ManyToMany(() => Actividad, (actividad) => actividad.carreras)
    actividades: Actividad[];
}