import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEstudianteDTO {

    @IsNumber()
    @IsNotEmpty()
    dni: number;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    apellido: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;

    constructor(){}
  }
  