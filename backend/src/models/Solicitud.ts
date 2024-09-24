import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Estado } from "./Estado";
import { Estudiante } from "./Estudiante";
import { Carrera } from "./Carrera";
import { Actividad } from "./Actividad";
import { ConstanciaFile } from "./ConstanciaFile";

@Entity()
export class Solicitud {
    constructor() { }

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    fecha: Date;

    @ManyToOne(() => Estudiante, estudiante => estudiante.solicitudes)
    estudiante: Estudiante

    @ManyToOne(() => Carrera, carrera => carrera.id)
    carrera: Carrera

    @ManyToOne(() => Actividad, actividad => actividad.cod)
    actividad: Actividad

    @ManyToOne(() => Estado, estado => estado.id)
    estado: Estado

    @OneToOne(() => ConstanciaFile, constancia => constancia.id,{cascade: true})
    @JoinColumn()
    constancia: ConstanciaFile;

    @Column({nullable: true})
    motivo_resolucion: string;

}
