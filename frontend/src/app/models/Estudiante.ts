export class Estudiante{
    dni: number;
    nombre: string;
    apellido: string;
    email: string;

    constructor(dni: number, nombre: string, apellido: string, email: string){
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
    }
}