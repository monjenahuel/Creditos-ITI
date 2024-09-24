import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './dbconfig';
import { Actividad } from './models/Actividad';
import { Area } from './models/Area';
import { Carrera } from './models/Carrera';
import { Consulta } from './models/Consulta';
import { Estado } from './models/Estado';
import { Estudiante } from './models/Estudiante';
import { Solicitud } from './models/Solicitud';
import { User } from './models/User';
import { ConsultaService } from './services/consulta.service';
import { ConsultaController } from './controllers/consulta.controller';
import { CarreraController } from './controllers/carrera/carrera.controller';
import { CarreraService } from './services/carrera/carrera.service';
import { SolicitudController } from './controllers/solicitud.controller';
import { SolicitudService } from './services/solicitud.service';
import { EstudianteService } from './services/estudiante.service';
import { ConstanciaFile } from './models/ConstanciaFile';
import { EstadoService } from './services/estado/estado.service';
import { EstadoController } from './controllers/estado/estado.controller';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), TypeOrmModule.forFeature([Estado,User,Area,Actividad,Carrera,Estudiante,Consulta,Solicitud,ConstanciaFile])],
  controllers: [ConsultaController, CarreraController, SolicitudController, EstadoController],
  providers: [SolicitudService,ConsultaService, CarreraService,EstudianteService, EstadoService],
})
export class AppModule {}
