import { Actividad } from "./Actividad";
import { Carrera } from "./Carrera";
import { Estudiante } from "./Estudiante";

export class Solicitud {
    id: number;
    fecha: Date;
    motivo_resolucion: string;
    estudiante: Estudiante
    carrera: Carrera
    actividad: Actividad;
    estado: { id: number, descripcion: string };
    //   constancia: string;

    constructor(id: number, fecha: Date, motivo_resolucion: string, estudiante: Estudiante, carrera: Carrera, actividad: Actividad, estado: { id: number, descripcion: string }) {
        this.id = id;
        this.fecha = fecha;
        this.motivo_resolucion = motivo_resolucion;
        this.estudiante = estudiante;
        this.carrera = carrera;
        this.actividad = actividad;
        this.estado = estado;
    }
}