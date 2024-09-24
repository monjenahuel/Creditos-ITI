import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { Actividad } from "./Actividad";

@Entity()
export class Area {

    @PrimaryColumn()
    cod : string

    @Column()
    descripcion : string

    @OneToMany(() => Actividad, (actividad) => actividad.area)
    actividades: Actividad[];

    constructor() { }
}