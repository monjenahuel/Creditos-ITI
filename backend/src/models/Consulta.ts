import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Estudiante } from "./Estudiante";
import { Carrera } from "./Carrera";

@Entity()
export class Consulta{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Estudiante, estudiante => estudiante.consultas)
    estudiante: Estudiante

    @ManyToOne(() => Carrera, carrera => carrera.id)
    carrera: Carrera

    @Column({type: 'varchar', length: 1500})
    consulta: string

    @Column({nullable: true})
    respuesta: string

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    fecha: Date;
}