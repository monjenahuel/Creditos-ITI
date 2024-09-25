import { __decorate } from "tslib";
import { Component, inject, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogCambiarEstadoComponent } from '../../components/dialog-cambiar-estado/dialog-cambiar-estado.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
let GestionSolicitudesComponent = class GestionSolicitudesComponent {
    constructor(solicitudService, dataService) {
        this.solicitudService = solicitudService;
        this.dataService = dataService;
        this.displayedColumns = ['id', 'dni', 'nombre', 'carrera', 'actividad', 'estado', 'constancia', 'resolucion'];
        this.solicitudes = [];
        this.estados = [];
        this.inputFilter = '';
        this.dialog = inject(MatDialog);
        this.solicitudService.getSolicitudByEstadoId(1).subscribe({
            next: (solicitudes) => {
                this.solicitudes = solicitudes;
                this.dataSource = new MatTableDataSource(this.solicitudes.map(solicitudToSolicitudMatTable)); //Transforma las Solicitudes en SolicitudMatTable para poder filtrar y ordenar
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: (error) => {
                console.error(error);
            }
        });
        this.dataService.getEstados().subscribe({
            next: (estados) => {
                this.estados = estados;
                this.estados = [...this.estados, { id: 0, descripcion: "Todos" }]; //Agrega una opcion para  mostrar todos los estados
                this.selectedEstado = this.estados.find((estado) => estado.descripcion == 'Pendiente');
                this.applyFilterEstado(this.selectedEstado);
            }
        });
    }
    //Filtra a nivel local
    applyFilter(event) {
        const filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    //Filtra a nivel de la base de datos
    applyFilterEstado(selectedEstado) {
        this.inputFilter = '';
        //Si se selecciona 'Todos' se traen todas las solicitudes
        if (selectedEstado.descripcion == 'Todos') {
            this.solicitudService.getAllSolicitudes().subscribe({
                next: (solicitudes) => {
                    this.solicitudes = solicitudes;
                    this.dataSource = new MatTableDataSource(this.solicitudes.map(solicitudToSolicitudMatTable));
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                },
                error: (error) => {
                    console.error(error);
                }
            });
        }
        else {
            //Si se selecciona un estado en particular se traen las solicitudes con ese estado
            this.solicitudService.getSolicitudByEstadoId(selectedEstado.id).subscribe({
                next: (solicitudes) => {
                    this.solicitudes = solicitudes;
                    this.dataSource = new MatTableDataSource(this.solicitudes.map(solicitudToSolicitudMatTable));
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                },
                error: (error) => {
                    console.error(error);
                }
            });
        }
    }
    statusStyle(status) {
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
    descargarConstancia(solicitudId) {
        this.solicitudService.downloadConstanciaBySolicitudId(solicitudId).subscribe({
            next: (response) => {
                console.log(response);
                const url = window.URL.createObjectURL(response);
                window.open(url);
            },
            error: (error) => {
                console.error(error);
            }
        });
    }
    cambiarEstado(row) {
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
};
__decorate([
    ViewChild(MatPaginator)
], GestionSolicitudesComponent.prototype, "paginator", void 0);
__decorate([
    ViewChild(MatSort)
], GestionSolicitudesComponent.prototype, "sort", void 0);
GestionSolicitudesComponent = __decorate([
    Component({
        selector: 'app-gestion-solicitudes',
        standalone: true,
        imports: [MatCardModule, MatPaginatorModule, MatSortModule, MatTableModule, MatInputModule, MatFormFieldModule, MatPaginator, MatSort, MatIcon, MatButtonModule, MatTooltipModule, MatDialogModule, MatSelectModule, FormsModule, MatSelectModule, CommonModule],
        templateUrl: './gestion-solicitudes.component.html',
        styleUrl: './gestion-solicitudes.component.css'
    })
], GestionSolicitudesComponent);
export { GestionSolicitudesComponent };
function solicitudToSolicitudMatTable(solicitud) {
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
    };
}
function abreviarCarrera(carrera) {
    switch (carrera.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) { //Ignora mayusculas y tildes
        case 'tecnicatura universitaria en redes y operaciones':
            return 'Tec. Redes';
        case 'tecnicatura universitaria en programacion':
            return 'Tec. Programación';
        case 'tecnicatura universitaria en videojuegos':
            return 'Tec. Videojuegos';
        case 'tecnicatura universitaria en inteligencia artificial':
            return 'Tec. IA';
        default:
            return carrera.split(' ').map((word) => word[0]).join('');
    }
}
//# sourceMappingURL=gestion-solicitudes.component.js.map