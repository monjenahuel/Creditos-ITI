import { IsNotEmpty, IsString, min, minLength, ValidateNested } from "class-validator";
import { Carrera } from "src/models/Carrera";
import { CreateEstudianteDTO } from "../Estudiante/CreateEstudianteDTO";
import { Type } from "class-transformer";


export class CreateConsultaDTO {

    @IsNotEmpty({ message: "The estudiante field must not be empty." })
    @ValidateNested()  // Valida el DTO anidado
    @Type(() => CreateEstudianteDTO)  // Especifica el tipo de DTO que está anidado
    estudiante: CreateEstudianteDTO;
    
    @IsNotEmpty({ message: "The carrera field must not be empty." })
    carrera: Carrera;

    @IsString({ message: "The consulta field must be a string." })
    @IsNotEmpty()
    consulta: string;

}