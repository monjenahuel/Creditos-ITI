import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConstanciaFile } from 'src/models/ConstanciaFile';
import { Solicitud } from 'src/models/Solicitud';
import { SolicitudService } from 'src/services/solicitud.service';
import { Estado } from 'src/models/Estado';

@Controller('solicitud')
export class SolicitudController {
  constructor(private readonly solicitudService: SolicitudService) { }

  @Get(':id')
  getSolicitudById(@Param('id') id: number): Promise<Solicitud> {
    return this.solicitudService.getSolicitudbyId(id);
  }

  @Get()
  getAllSolicituds(): Promise<Solicitud[]> {
    return this.solicitudService.getAllSolicitudes();
  }

  @Post()
  @UseInterceptors(FileInterceptor('constancia'))
  async postFile(@Body() body: any,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 5242880 }), //Tamaño maximo de 5MB
        new FileTypeValidator({ fileType: 'pdf|jpeg|png' }),
      ],
    }),) file: Express.Multer.File): Promise<Solicitud> {

    console.log("Body", body);
    console.log("File", file);

    let solicitud = await this.solicitudService.formDataToSolicitud(body, file);

    console.log("Solicitud Armada", solicitud);

    return this.solicitudService.postSolicitud(solicitud);
  }

  @Get(':id/constancia')
  async getConstanciaBySolicitudId(@Param('id') id: number, @Res() res: Response): Promise<any> {
    const archivo = await this.solicitudService.getConstanciaBySolicitudId(id);
    console.log(archivo);

    res.setHeader('Content-Disposition', `attachment; filename=${archivo.filename}`)
    res.setHeader('Content-Type', `${archivo.fileType}`);

    return res.send(archivo.blob);
  }

  @Get('/estado/:id')
  getSolicitudesByEstado(@Param('id') id: number): Promise<Solicitud[]> {
    return this.solicitudService.getSolicitudesByEstado(id);
  }

  @Get('/dni/:dni')
  getSolicitudesByDNI(@Param('dni') dni: number): Promise<Solicitud[]> {
    return this.solicitudService.getSolicitudesByDNI(dni);
  }

  


  @Patch(':id/estado')
  cambiarEstadoSolicitud(@Param('id') id: number, @Body() body : Map<string,Object> ): Promise<Solicitud> {
    return this.solicitudService.cambiarEstadoSolicitud(id, body);
  }
}