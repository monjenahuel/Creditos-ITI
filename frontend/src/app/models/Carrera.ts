import { Actividad } from "./Actividad";

export class Carrera{
    id: number;
    nombre: string;
    actividades?: Actividad[];

    constructor(id: number, nombre: string){
        this.id = id;
        this.nombre = nombre;
    }
}