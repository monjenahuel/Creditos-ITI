import { Area } from "./Area";

export class Actividad{
    cod: string;
    descripcion: string;
    area: Area;

    constructor(cod: string, descripcion: string, area: Area){
        this.cod = cod;
        this.descripcion = descripcion;
        this.area = area;
    }
}