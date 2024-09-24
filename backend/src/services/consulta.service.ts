import { Injectable, NotFoundException } from '@nestjs/common';
import { Consulta } from '../models/Consulta';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConsultaDTO } from 'src/models/dtos/Consulta/CreateConsultaDTO';
import { Estudiante } from 'src/models/Estudiante';
import { plainToInstance } from 'class-transformer';
import { ResponseConsultaDTO } from 'src/models/dtos/Consulta/ResponseConsultaDTO';
import { EstudianteService } from './estudiante.service';

@Injectable()
export class ConsultaService {

    constructor(
        @InjectRepository(Consulta) 
        private readonly consultaRepository: Repository<Consulta>,
        @InjectRepository(Estudiante) 
        private readonly estudianteRepository: Repository<Estudiante>,
        private readonly estudianteService: EstudianteService
        

    ) { }

    async postConsulta(createConsultaDTO: CreateConsultaDTO): Promise<Consulta> {

        const consultaEntity: Consulta = plainToInstance(Consulta, createConsultaDTO);

        const estudiantePersistido: Estudiante = await this.estudianteService.updateOrCreateEstudiante(consultaEntity.estudiante);

        consultaEntity.estudiante = estudiantePersistido;

        return this.consultaRepository.save(consultaEntity);
    }

    getAllConsultas(): Promise<Consulta[]> {
        return this.consultaRepository.find({ relations: ['estudiante', 'carrera'] });
    }

    async getConsultabyId(id: number): Promise<Consulta> {

        let consultaEncontrada: Consulta = await this.consultaRepository.findOne({ where: { id }, relations: ['estudiante', 'carrera'] });

        if (!consultaEncontrada) {
            throw new NotFoundException('Consulta no encontrada');
        } else {
            return consultaEncontrada;
        }
    }

    async getConsultasbyDni(dni: number): Promise<Consulta[]> {
        console.log("DNI: ", dni);

        let result: Consulta[] = []

        result = await this.consultaRepository.createQueryBuilder('consulta')
            .innerJoinAndSelect('consulta.estudiante', 'estudiante')
            .innerJoinAndSelect('consulta.carrera', 'carrera')
            .where('estudiante.dni = :dni', { dni })
            .getMany();

        console.log("Resultado: ", result);

        return result;
    }

    async getConsultasPendientes(): Promise<Consulta[]> {
        return this.consultaRepository.createQueryBuilder('consulta')
            .innerJoinAndSelect('consulta.estudiante', 'estudiante')
            .innerJoinAndSelect('consulta.carrera', 'carrera')
            .where('consulta.respuesta IS NULL')
            // .orderBy('id', 'DESC')
            .getMany();
    }

    async responderConsulta(id: number, respuesta: ResponseConsultaDTO): Promise<Consulta> {

        const consultaEncontrada: Consulta = await this.consultaRepository.findOne({ where: { id }});
        if(!consultaEncontrada){
            throw new NotFoundException('Consulta no encontrada');
        }

        const consultaRespondida = plainToInstance(Consulta, {...consultaEncontrada, ...respuesta});

        return this.consultaRepository.save(consultaRespondida);
    }

    async cantidadDeConsultasPendientes(): Promise<number> {
        return this.consultaRepository.createQueryBuilder('consulta')
            .where('consulta.respuesta IS NULL')
            .getCount();
    }
}
