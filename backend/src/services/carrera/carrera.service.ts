import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrera } from 'src/models/Carrera';
import { Repository } from 'typeorm';

@Injectable()
export class CarreraService {

    constructor(
        @InjectRepository(Carrera) private carreraRepository: Repository<Carrera>,
    ) { }
    
    getAllCarreras(): Promise<Carrera[]> {
        return this.carreraRepository.find({ relations: ['actividades', 'actividades.area'] });
    }
}
