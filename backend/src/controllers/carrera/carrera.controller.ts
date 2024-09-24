import { Controller, Get } from '@nestjs/common';
import { Carrera } from 'src/models/Carrera';
import { CarreraService } from 'src/services/carrera/carrera.service';

@Controller('carrera')
export class CarreraController {
    constructor(
        private carreraService: CarreraService,
    ) { }

    @Get()
    getAllCarreras(): Promise<Carrera[]> {
        return this.carreraService.getAllCarreras();
    }
}
