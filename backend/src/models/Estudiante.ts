import { Cons } from "rxjs";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Consulta } from "./Consulta";
import { Solicitud } from "./Solicitud";

@Entity()
export class Estudiante {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  dni: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  email: string;

  @OneToMany(() => Consulta, (consulta) => consulta.estudiante)
  consultas: Consulta[];
  
  @OneToMany(() => Solicitud, (solicitud) => solicitud.estudiante)
  solicitudes: Solicitud[];

  constructor(){}
}


