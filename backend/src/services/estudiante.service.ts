import { Injectable, NotFoundException } from '@nestjs/common';
import { Estudiante } from '../models/Estudiante';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EstudianteService {

    constructor(
        @InjectRepository(Estudiante)
        private readonly estudianteRepository: Repository<Estudiante>,
    ) { }

    postEstudiante(estudiante: Estudiante): Promise<Estudiante> {
        return this.estudianteRepository.save(estudiante);
    }

    getAllEstudiantes(): Promise<Estudiante[]> {
        return this.estudianteRepository.find();
    }

    async getEstudiantebyId(id: number): Promise<Estudiante> {
        
        let estudianteEncontrada: Estudiante = await this.estudianteRepository.findOne({where: {id}  , relations: ['estudiante', 'carrera']});
        
        if (!estudianteEncontrada) {
            throw new NotFoundException('Estudiante no encontrada');
        }else{
            return estudianteEncontrada;
        }
    }
    
    async updateOrCreateEstudiante(estudiante: Estudiante): Promise<Estudiante> {

        console.log("Estudiante a persistir: ", estudiante);

        let estudianteExistente: Estudiante = await this.estudianteRepository.findOne({ where: { dni: estudiante.dni } });
        if(estudianteExistente){
            console.log("Estudiante existe, actualizando datos");
            estudiante.id = estudianteExistente.id;
        }

        return this.estudianteRepository.save(estudiante);
    }

}