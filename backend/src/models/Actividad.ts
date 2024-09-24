import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Area } from "./Area";
import { Carrera } from "./Carrera";

@Entity()
export class Actividad {
    
    @PrimaryColumn()
    cod : string

    @Column()
    descripcion : string

    @ManyToOne(() => Area)
    @JoinColumn()
    area: Area;

    @ManyToMany(() => Carrera, (carrera) => carrera.actividades)
    @JoinTable({name: "carrera_actividad"}) //Para crear la tabla intermedia
    carreras: Carrera[];

    constructor() { }
}