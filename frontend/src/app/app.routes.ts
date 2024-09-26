import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CargarSolicitudComponent } from './pages/cargar-solicitud/cargar-solicitud.component';
import { CargarConsultaComponent } from './pages/cargar-consulta/cargar-consulta.component';
import { GestionSolicitudesComponent } from './pages/gestion-solicitudes/gestion-solicitudes.component';
import { SeguimientoSolicitudesComponent } from './pages/seguimiento-solicitudes/seguimiento-solicitudes.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'cargar-solicitud', component: CargarSolicitudComponent},
    {path: 'cargar-consulta', component: CargarConsultaComponent},
    {path: 'gestion-solicitudes', component: GestionSolicitudesComponent},
    {path: 'seguimiento-solicitudes', component: SeguimientoSolicitudesComponent},
    {path: '**', redirectTo: 'home'}
];
