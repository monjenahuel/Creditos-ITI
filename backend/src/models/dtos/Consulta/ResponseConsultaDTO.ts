import { IsNotEmpty, IsString } from "class-validator";

export class ResponseConsultaDTO {
    
    @IsNotEmpty({ message: "respuesta no puede ser null" })
    @IsString({ message: "respuesta debe ser un string" })
    respuesta: string
}