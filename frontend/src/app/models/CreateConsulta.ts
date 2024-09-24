import { Actividad } from "./Actividad";
import { Carrera } from "./Carrera";
import { Estudiante } from "./Estudiante";

export class CreateConsulta{
    consulta: string;
    carrera: Carrera;
    estudiante: Estudiante;

    constructor(consulta: string, carrera: Carrera, estudiante: Estudiante){
        this.consulta = consulta;
        this.carrera = carrera;
        this.estudiante = estudiante;
    }
}