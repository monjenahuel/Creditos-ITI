import { Body, Controller, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Consulta } from 'src/models/Consulta';
import { CreateConsultaDTO } from 'src/models/dtos/Consulta/CreateConsultaDTO';
import { ResponseConsultaDTO } from 'src/models/dtos/Consulta/ResponseConsultaDTO';
import { ConsultaService } from 'src/services/consulta.service';

@Controller('consulta')
export class ConsultaController {
    constructor(private readonly consultaService: ConsultaService) {}

  @Get(':id')
  getConsultaById(@Param('id') id: number): Promise<Consulta> {
    return this.consultaService.getConsultabyId(id);
  }

  @Get()
  getConsultasbyQuery(@Query('dni') dni: number, @Query('pendiente') pendiente: boolean ): Promise<Consulta[]> {
    
    if(pendiente){
        return this.consultaService.getConsultasPendientes();
    }
    if(dni){
        return this.consultaService.getConsultasbyDni(dni);
    }else{
        return this.consultaService.getAllConsultas();
    }
  }

  @Post()
  postConsulta(@Body() consulta: CreateConsultaDTO): Promise<Consulta> {
    return this.consultaService.postConsulta(consulta);
  }

  @Patch(':id')
  responderConsulta(@Param('id') id: number, @Body() respuesta: ResponseConsultaDTO): Promise<Consulta> {
    console.log("Respuesta: ", respuesta);
    return this.consultaService.responderConsulta(id, respuesta);
  }

  @Get('pendiente/cantidad')
  getCantidadConsultasPendientes(): Promise<number> {
    return this.consultaService.cantidadDeConsultasPendientes();
  }


}
