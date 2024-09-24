import { Controller, Get } from '@nestjs/common';
import { EstadoService } from 'src/services/estado/estado.service';

@Controller('estado')
export class EstadoController {

    constructor(
        private readonly estadoService: EstadoService
    ) { }

    @Get()
    getAllEstados() {
        return this.estadoService.getAllEstados();
    }
}
