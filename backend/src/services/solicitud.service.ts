import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solicitud } from 'src/models/Solicitud';
import { Estudiante } from 'src/models/Estudiante';
import { Carrera } from 'src/models/Carrera';
import { Actividad } from 'src/models/Actividad';
import { EstudianteService } from './estudiante.service';
import { Estado } from 'src/models/Estado';
import { ConstanciaFile } from 'src/models/ConstanciaFile';
import { plainToClass } from 'class-transformer';

@Injectable()
export class SolicitudService {

    constructor(
        @InjectRepository(Solicitud)
        private readonly solicitudRepository: Repository<Solicitud>,
        @InjectRepository(Estudiante)
        private readonly estudianteRepository: Repository<Estudiante>,
        @InjectRepository(Carrera)
        private readonly carreraRepository: Repository<Carrera>,
        @InjectRepository(Actividad)
        private readonly actividadRepository: Repository<Actividad>,
        private readonly estudianteService: EstudianteService,
        @InjectRepository(Estado)
        private readonly estadoRepository: Repository<Estado>

    ) { }

    postSolicitud(solicitud: Solicitud): Promise<Solicitud> {
        return this.solicitudRepository.save(solicitud);
    }

    getAllSolicitudes(): Promise<Solicitud[]> {
        return this.solicitudRepository.find({relations: ['estudiante', 'carrera', 'actividad', 'estado']});
    }

    async getSolicitudbyId(id: number): Promise<Solicitud> {
        
        let solicitudEncontrada: Solicitud = await this.solicitudRepository.findOne({where: {id}  , relations: ['estudiante', 'carrera', 'actividad', 'estado']});
        
        if (!solicitudEncontrada) {
            throw new NotFoundException('Solicitud no encontrada');
        }else{
            return solicitudEncontrada;
        }
    }

    async getSolicitudesByEstado(estadoId: number): Promise<Solicitud[]> {

        let estado: Estado = await this.estadoRepository.findOneByOrFail({id: estadoId});

        return this.solicitudRepository.find({where: {estado}, relations: ['estudiante', 'carrera', 'actividad', 'estado']});
    }

    async formDataToSolicitud(body: any, file: Express.Multer.File): Promise<Solicitud> {

        console.log("Armando solicitud")

        let solicitud = new Solicitud();
        
        solicitud.actividad = await this.actividadRepository.findOneByOrFail({cod: body.actividad_cod});
        solicitud.carrera = await this.carreraRepository.findOneByOrFail({id: body.carrera_id});

        let estudiante : Estudiante = new Estudiante()
        estudiante.nombre = body.nombre;
        estudiante.apellido = body.apellido;
        estudiante.email = body.email;
        estudiante.dni = body.dni;
        estudiante = await this.estudianteService.updateOrCreateEstudiante(estudiante);

        let constancia = new ConstanciaFile();
        constancia.blob = file.buffer;
        constancia.filename = file.originalname;
        constancia.fileType = file.mimetype;
        
        solicitud.estado = new Estado(1, "Pendiente");
        solicitud.estudiante = estudiante 
        solicitud.constancia = constancia;

        return solicitud;
    }

    async getConstanciaBySolicitudId(id: number): Promise<ConstanciaFile> {
        return this.solicitudRepository.findOneOrFail({where: {id}, relations: ['constancia']}).then((solicitud: Solicitud) => {
            return solicitud.constancia;
        });
      }

    async cambiarEstadoSolicitud(id: number, body: Map<string,Object>): Promise<Solicitud> {
        console.log("Cambiando estado de solicitud: ",id, body)

        const solicitudEncontrada: Solicitud = await this.solicitudRepository.findOneOrFail({where: {id}, relations: ['estado']});
        if(body.has('estado')){
            solicitudEncontrada.estado = plainToClass(Estado, body.get('estado'));
        }
        if(body.has('motivo_resolucion')){
            solicitudEncontrada.motivo_resolucion = body.get('motivo_resolucion').toLocaleString();
        }else{
            console.log("Borrando resolucion")
            solicitudEncontrada.motivo_resolucion = '';
        }

        return this.solicitudRepository.save(solicitudEncontrada);
      }

}