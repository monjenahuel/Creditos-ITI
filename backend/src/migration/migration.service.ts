import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Actividad } from 'src/models/Actividad';
import { Area } from 'src/models/Area';
import { Carrera } from 'src/models/Carrera';
import { Estado } from 'src/models/Estado';
import { DataSource } from 'typeorm';


@Injectable()
export class MigrationService {
    constructor(
        @InjectDataSource() private readonly dataSource: DataSource,
    ) { }

    async seed() {
        this.insertCarreras();
        this.insertEstados();
        this.insertAreas();
        this.insertActividades();
        this.insertCarreraActividad();
    }

    async insertCarreras() {
        const count = await this.dataSource
            .getRepository(Carrera)
            .createQueryBuilder('carrera')
            .getCount();

        if (count === 0) { // Solo insertar si la tabla está vacía
            const records = [
                { id: 1, nombre: 'Tecnicatura Universitaria en Redes y Operaciones' },
                { id: 2, nombre: 'Tecnicatura Universitaria en Programacion' },
                { id: 3, nombre: 'Tecnicatura Universitaria en Videojuegos' },
                { id: 4, nombre: 'Tecnicatura Universitaria en Inteligencia Artificial' },
            ];


            // Usar QueryBuilder para insertar registros
            const insertQueryBuilder = this.dataSource
                .createQueryBuilder()
                .insert()
                .into(Carrera)
                .values(records);

            await insertQueryBuilder.execute();
            console.log('SEEDER: Carreras insertadas');
        }
    }

    async insertEstados() {
        const count = await this.dataSource
            .getRepository(Estado) // Cambia esto por tu entidad real
            .createQueryBuilder('estado')
            .getCount();

        if (count === 0) { // Solo insertar si la tabla está vacía
            const records = [
                { id: 1, descripcion: 'Pendiente' },
                { id: 2, descripcion: 'En Proceso' },
                { id: 3, descripcion: 'Rechazada' },
                { id: 4, descripcion: 'Acreditada' },
            ];

            // Usar consultas nativas para insertar registros
            const insertQuery = `
        INSERT INTO estado (id, descripcion) VALUES
        (?, ?), (?, ?), (?, ?), (?, ?)
      `;

            // Convertir el arreglo de registros a un formato adecuado
            const params = records.flatMap(record => [record.id, record.descripcion]);

            await this.dataSource.query(insertQuery, params);
            console.log('SEEDER: Estados insertados');
        }
    }

    async insertAreas() {
        const count = await this.dataSource
            .getRepository(Area) // Cambia esto por tu entidad real
            .createQueryBuilder('area')
            .getCount();

        if (count === 0) { // Solo insertar si la tabla está vacía
            const records = [
                { cod: 'CR1_033', descripcion: 'Espacio de Integración Curricular / Proyecto de software' },
                { cod: 'CR2_ITI', descripcion: 'Actividades de tipo formativas académicas y profesionales' },
                { cod: 'CR3_ITI', descripcion: 'Actividades de tipo sociales, culturales y deportivas en la Universidad' },
                { cod: 'CR4_ITI', descripcion: 'Actividades de tipo formativas en docencia e investigación' },
            ];

            // Usar consultas nativas para insertar registros
            const insertQuery = `
            INSERT INTO area (cod, descripcion) VALUES
            (?, ?), (?, ?), (?, ?), (?, ?)
          `;

            // Convertir el arreglo de registros a un formato adecuado
            const params = records.flatMap(record => [record.cod, record.descripcion]);

            await this.dataSource.query(insertQuery, params);
            console.log('SEEDER: Areas insertadas');
        }
    }

    async insertActividades() {
        const count = await this.dataSource
            .getRepository(Actividad) // Cambia esto por tu entidad real
            .createQueryBuilder('actividad')
            .getCount();

        if (count === 0) { // Solo insertar si la tabla está vacía
            const records = [
                { cod: 'CR012_33', descripcion: 'Desarrollo de Aplicaciones, en UNAHUR (Programación)', areaCod: 'CR1_033' },
                { cod: 'CR012_34', descripcion: 'Desarrollo de Aplicaciones, en UNAHUR (Redes)', areaCod: 'CR1_033' },
                { cod: 'CR011_033', descripcion: 'Desarrollo de Práctica Profesional Supervisada (PPS) (Programación)', areaCod: 'CR1_033' },
                { cod: 'CR011_034', descripcion: 'Desarrollo de Práctica Profesional Supervisada (PPS) (Redes)', areaCod: 'CR1_033' },
                { cod: 'CR002', descripcion: 'Participación como asistente en Jornadas / Workshops / Congresos', areaCod: 'CR2_ITI' },
                { cod: 'CR003', descripcion: 'Talleres especiales - Taller de Github', areaCod: 'CR2_ITI' },
                { cod: 'CR013', descripcion: 'Talleres especiales - Taller de Gestión de la seguridad informática', areaCod: 'CR2_ITI' },
                { cod: 'CR014', descripcion: 'Talleres Especiales - Gestión de Firewall', areaCod: 'CR2_ITI' },
                { cod: 'CR015', descripcion: 'Participación en Competencias Estudiantiles - Rally Innovación 2023', areaCod: 'CR2_ITI' },
                { cod: 'CR017', descripcion: 'Participación como asistente en Jornadas / Workshops / Congresos (1 día)', areaCod: 'CR2_ITI' },
                { cod: 'CR018', descripcion: 'Talleres Especiales - Curso de Iniciación al Mundo Laboral', areaCod: 'CR2_ITI' },
                { cod: 'CR021', descripcion: 'Participación en Proyectos Abiertos', areaCod: 'CR2_ITI' },
                { cod: 'CR023', descripcion: 'Intercambios estudiantiles presenciales y/o virtuales', areaCod: 'CR2_ITI' },
                { cod: 'CR024', descripcion: 'Formación Profesional', areaCod: 'CR2_ITI' },
                { cod: 'CR027', descripcion: 'Taller de Procesamiento digital de imágenes', areaCod: 'CR2_ITI' },
                { cod: 'CR004', descripcion: 'Talleres Especiales (más de 32hs)', areaCod: 'CR2_ITI' },
                { cod: 'CR005', descripcion: 'Voluntariados', areaCod: 'CR3_ITI' },
                { cod: 'CR006', descripcion: 'Talleres deportivos', areaCod: 'CR3_ITI' },
                { cod: 'CR019', descripcion: 'UNAHUR@TIC - 1er Presencia - Encuentro de Informática', areaCod: 'CR3_ITI' },
                { cod: 'CR020', descripcion: 'UNAHUR@TIC - 1er Presencia - Encuentro de Informática (medio día)', areaCod: 'CR3_ITI' },
                { cod: 'CR028', descripcion: 'UNAHUR@TIC - 2da presencia - Encuentro de Informática', areaCod: 'CR3_ITI' },
                { cod: 'CR022', descripcion: 'Taller de eSport', areaCod: 'CR3_ITI' },
                { cod: 'CR007', descripcion: 'Talleres Culturales', areaCod: 'CR3_ITI' },
                { cod: 'CR008', descripcion: 'Participación en el programa "Un estudiantes/Un compañero/a"', areaCod: 'CR4_ITI' },
                { cod: 'CR009', descripcion: 'Participación como Estudiante Asistente', areaCod: 'CR4_ITI' },
                { cod: 'CR025', descripcion: 'Participación en actividades de difusión académica', areaCod: 'CR4_ITI' },
                { cod: 'CR016_033', descripcion: 'Asistencia Técnica a grupos de Investigación de la Universidad', areaCod: 'CR4_ITI' },
                { cod: 'CR010', descripcion: 'Colaboración en materias', areaCod: 'CR4_ITI' },
            ];

            await this.dataSource
                .createQueryBuilder()
                .insert()
                .into(Actividad) // Cambia esto por tu entidad real
                .values(records)
                .execute();

            console.log("SEEDER: Actividades insertadas");
        }
    }

    async insertCarreraActividad() {

        const countResult = await this.dataSource
            .createQueryBuilder()
            .select('COUNT(*)', 'count')
            .from('carrera_actividad', 'table')
            .getRawOne();
        
        const count = Number(countResult.count)

        if (count === 0) { // Solo insertar si la tabla está vacía
            const records = [
                { actividadCod: 'CR002', carreraId: 1 },
                { actividadCod: 'CR002', carreraId: 2 },
                { actividadCod: 'CR002', carreraId: 3 },
                { actividadCod: 'CR002', carreraId: 4 },
                { actividadCod: 'CR003', carreraId: 1 },
                { actividadCod: 'CR003', carreraId: 2 },
                { actividadCod: 'CR003', carreraId: 3 },
                { actividadCod: 'CR003', carreraId: 4 },
                { actividadCod: 'CR004', carreraId: 1 },
                { actividadCod: 'CR004', carreraId: 2 },
                { actividadCod: 'CR004', carreraId: 3 },
                { actividadCod: 'CR004', carreraId: 4 },
                { actividadCod: 'CR005', carreraId: 1 },
                { actividadCod: 'CR005', carreraId: 2 },
                { actividadCod: 'CR005', carreraId: 3 },
                { actividadCod: 'CR005', carreraId: 4 },
                { actividadCod: 'CR006', carreraId: 1 },
                { actividadCod: 'CR006', carreraId: 2 },
                { actividadCod: 'CR006', carreraId: 3 },
                { actividadCod: 'CR006', carreraId: 4 },
                { actividadCod: 'CR007', carreraId: 1 },
                { actividadCod: 'CR007', carreraId: 2 },
                { actividadCod: 'CR007', carreraId: 3 },
                { actividadCod: 'CR007', carreraId: 4 },
                { actividadCod: 'CR008', carreraId: 1 },
                { actividadCod: 'CR008', carreraId: 2 },
                { actividadCod: 'CR008', carreraId: 3 },
                { actividadCod: 'CR008', carreraId: 4 },
                { actividadCod: 'CR009', carreraId: 1 },
                { actividadCod: 'CR009', carreraId: 2 },
                { actividadCod: 'CR009', carreraId: 3 },
                { actividadCod: 'CR009', carreraId: 4 },
                { actividadCod: 'CR010', carreraId: 1 },
                { actividadCod: 'CR010', carreraId: 2 },
                { actividadCod: 'CR010', carreraId: 3 },
                { actividadCod: 'CR010', carreraId: 4 },
                { actividadCod: 'CR011_033', carreraId: 2 },
                { actividadCod: 'CR011_034', carreraId: 1 },
                { actividadCod: 'CR012_33', carreraId: 2 },
                { actividadCod: 'CR012_34', carreraId: 1 },
                { actividadCod: 'CR013', carreraId: 1 },
                { actividadCod: 'CR013', carreraId: 2 },
                { actividadCod: 'CR013', carreraId: 3 },
                { actividadCod: 'CR013', carreraId: 4 },
                { actividadCod: 'CR014', carreraId: 1 },
                { actividadCod: 'CR014', carreraId: 2 },
                { actividadCod: 'CR014', carreraId: 3 },
                { actividadCod: 'CR014', carreraId: 4 },
                { actividadCod: 'CR015', carreraId: 1 },
                { actividadCod: 'CR015', carreraId: 2 },
                { actividadCod: 'CR015', carreraId: 3 },
                { actividadCod: 'CR015', carreraId: 4 },
                { actividadCod: 'CR016_033', carreraId: 2 },
                { actividadCod: 'CR017', carreraId: 1 },
                { actividadCod: 'CR017', carreraId: 2 },
                { actividadCod: 'CR017', carreraId: 3 },
                { actividadCod: 'CR017', carreraId: 4 },
                { actividadCod: 'CR018', carreraId: 1 },
                { actividadCod: 'CR018', carreraId: 2 },
                { actividadCod: 'CR018', carreraId: 3 },
                { actividadCod: 'CR018', carreraId: 4 },
                { actividadCod: 'CR019', carreraId: 1 },
                { actividadCod: 'CR019', carreraId: 2 },
                { actividadCod: 'CR019', carreraId: 3 },
                { actividadCod: 'CR019', carreraId: 4 },
                { actividadCod: 'CR020', carreraId: 1 },
                { actividadCod: 'CR020', carreraId: 2 },
                { actividadCod: 'CR020', carreraId: 3 },
                { actividadCod: 'CR020', carreraId: 4 },
                { actividadCod: 'CR021', carreraId: 1 },
                { actividadCod: 'CR021', carreraId: 2 },
                { actividadCod: 'CR021', carreraId: 3 },
                { actividadCod: 'CR021', carreraId: 4 },
                { actividadCod: 'CR022', carreraId: 1 },
                { actividadCod: 'CR022', carreraId: 2 },
                { actividadCod: 'CR022', carreraId: 3 },
                { actividadCod: 'CR022', carreraId: 4 },
                { actividadCod: 'CR023', carreraId: 1 },
                { actividadCod: 'CR023', carreraId: 2 },
                { actividadCod: 'CR023', carreraId: 3 },
                { actividadCod: 'CR023', carreraId: 4 },
                { actividadCod: 'CR024', carreraId: 1 },
                { actividadCod: 'CR024', carreraId: 2 },
                { actividadCod: 'CR024', carreraId: 3 },
                { actividadCod: 'CR024', carreraId: 4 },
                { actividadCod: 'CR025', carreraId: 1 },
                { actividadCod: 'CR025', carreraId: 2 },
                { actividadCod: 'CR025', carreraId: 3 },
                { actividadCod: 'CR025', carreraId: 4 },
                { actividadCod: 'CR027', carreraId: 1 },
                { actividadCod: 'CR027', carreraId: 2 },
                { actividadCod: 'CR027', carreraId: 3 },
                { actividadCod: 'CR027', carreraId: 4 },
                { actividadCod: 'CR028', carreraId: 1 },
                { actividadCod: 'CR028', carreraId: 2 },
                { actividadCod: 'CR028', carreraId: 3 },
                { actividadCod: 'CR028', carreraId: 4 },
            ];

            await this.dataSource
                .createQueryBuilder()
                .insert()
                .into('carrera_actividad') // Nombre de la tabla
                .values(records)
                .execute();

            console.log("SEEDER: Carrera_Actividad insertadas");
        }
    }

}
