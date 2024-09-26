import { AfterViewInit, Component, inject, input, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Solicitud } from '../../models/Solicitud';
import { SolicitudService } from '../../services/solicitud.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogCambiarEstadoComponent, Estado } from '../../components/dialog-cambiar-estado/dialog-cambiar-estado.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface SolicitudMatTable {
  id: string;
  fecha: string;
  nombre: string;
  apellido: string;
  email: string;
  estado: string;
  estado_id: string;
  dni: string;
  carrera: string;
  carrera_abrev: string;
  actividadCod: string;
  actividadDesc: string;
  motivo_resolucion: string;
}

@Component({
  selector: 'app-seguimiento-solicitudes',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule, MatSortModule, MatTableModule, MatInputModule, MatFormFieldModule, MatPaginator, MatSort, MatIcon, MatButtonModule, MatTooltipModule, MatDialogModule, MatSelectModule, FormsModule, MatSelectModule, CommonModule],
  templateUrl: './seguimiento-solicitudes.component.html',
  styleUrl: './seguimiento-solicitudes.component.css'
})
export class SeguimientoSolicitudesComponent {


  displayedColumns: string[] = ['id', 'dni', 'nombre', 'carrera', 'actividad', 'estado', 'constancia', 'resolucion'];

  solicitudes: Solicitud[] = [];

  dataSource!: MatTableDataSource<SolicitudMatTable>;

  inputDNI: any = '';

  feedback: any = 'Ingrese su DNI para buscar solicitudes';

  ultimaBusqueda: any = '';


  @ViewChild(MatPaginator)
  paginator!: MatPaginator | null;

  @ViewChild(MatSort)
  sort!: MatSort | null;

  dialog = inject(MatDialog);


  constructor(
    private readonly solicitudService: SolicitudService,
  ) {

    this.dataSource = new MatTableDataSource(this.solicitudes.map(solicitudToSolicitudMatTable));

  }

  getSolicitudesByDNI(input: any) {

    if(input === this.ultimaBusqueda) {
      console.log("Resultado ya cargado")
      return;
    }

    if (Number.isNaN(parseInt(input))) {
      console.log('El DNI no es un número');
      return;
    }

    this.ultimaBusqueda = input;


    this.solicitudService.getSolicitudByDni(input).subscribe({
      next: (solicitudes: Solicitud[]) => {
        console.log(solicitudes);

        if (solicitudes.length === 0) {
          this.feedback = 'No se encontraron solicitudes con ese DNI';
        }

        this.solicitudes = solicitudes;
        this.dataSource = new MatTableDataSource(this.solicitudes.map(solicitudToSolicitudMatTable));

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error(error);
      }
    })

  }


  //Filtra a nivel local
  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  statusStyle(status: string) {
    switch (status) {
      case 'Pendiente':
        return 'color: #EB7D00; font-weight: bold;';
      case 'Rechazada':
        return 'color: red; font-weight: bold;';
      case 'Acreditada':
        return 'color: green; font-weight: bold;';
      case 'En Proceso':
        return 'color: blue; font-weight: bold;';
      default:
        return 'color: black; font-weight: bold;';
    }
  }

  descargarConstancia(solicitudId: string) {
    this.solicitudService.downloadConstanciaBySolicitudId(solicitudId).subscribe({
      next: (response: any) => {
        console.log(response)
        const url = window.URL.createObjectURL(response);
        window.open(url);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  cambiarEstado(row: any): void {
    //Abre el dialog con los datos de la fila seleccionada
    const dialogRef = this.dialog.open(DialogCambiarEstadoComponent, {
      data: {
        sol_id: row.id,
        motivo_resolucion: row.motivo_resolucion,
        estado: {
          estado: row.estado,
          id: row.estado_id
        }
      }
    });

    //Actualiza la tabla con el nuevo estado y motivo de resolución
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        row.estado = result.estado.descripcion;
        row.estado_id = result.estado.id;
        row.motivo_resolucion = result.motivo_resolucion;
      }
    });
  }
}

function solicitudToSolicitudMatTable(solicitud: Solicitud): SolicitudMatTable {
  return {
    id: solicitud.id.toString(),
    fecha: solicitud.fecha.toString(),
    nombre: solicitud.estudiante.nombre,
    apellido: solicitud.estudiante.apellido,
    email: solicitud.estudiante.email,
    estado: solicitud.estado.descripcion,
    estado_id: solicitud.estado.id.toString(),
    dni: solicitud.estudiante.dni.toString(),
    carrera: solicitud.carrera.nombre,
    carrera_abrev: abreviarCarrera(solicitud.carrera.nombre),
    actividadCod: solicitud.actividad.cod,
    actividadDesc: solicitud.actividad.descripcion,
    motivo_resolucion: solicitud.motivo_resolucion
  }
}

function abreviarCarrera(carrera: string): string {

  switch (carrera.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) { //Ignora mayusculas y tildes
    case 'tecnicatura universitaria en redes y operaciones':
      return 'Tec. Redes'
    case 'tecnicatura universitaria en programacion':
      return 'Tec. Programación'
    case 'tecnicatura universitaria en videojuegos':
      return 'Tec. Videojuegos'
    case 'tecnicatura universitaria en inteligencia artificial':
      return 'Tec. IA'
    default:
      return carrera.split(' ').map((word) => word[0]).join('');
  }
}





