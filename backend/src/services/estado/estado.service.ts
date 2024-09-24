import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estado } from 'src/models/Estado';
import { In, Repository } from 'typeorm';

@Injectable()
export class EstadoService {

    constructor(
        @InjectRepository(Estado) private readonly estadoRepository: Repository<Estado>
    ) { }

    getAllEstados(): Promise<Estado[]> {
        return this.estadoRepository.find();
    }
}
