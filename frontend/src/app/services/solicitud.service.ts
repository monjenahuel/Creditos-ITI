import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../components/dialog-cambiar-estado/dialog-cambiar-estado.component';
import { Solicitud } from '../models/Solicitud';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
 
  private url = environment.apiUrl
  private http = inject(HttpClient);


  postSolicitud(solicitud: any): Observable<any>{
    console.log("Enviando FormData", solicitud);
    console.log("URL", `${this.url}/solicitud`);
    return this.http.post(`${this.url}/solicitud`,solicitud);
  }

  getAllSolicitudes(): Observable<any>{
    return this.http.get(`${this.url}/solicitud`);
  }

  getSolicitudByEstadoId(estadoId: number): Observable<any>{
    return this.http.get(`${this.url}/solicitud/estado/${estadoId}`);
  }

  downloadConstanciaBySolicitudId(id: string) {
    return this.http.get(`${this.url}/solicitud/${id}/constancia`, {
      responseType: 'blob'  // Indicamos que la respuesta es un blob
    });
  }

  cambiarEstadoSolicitud(idSolicitud: string, body: any): Observable<any> {
    return this.http.patch(`${this.url}/solicitud/${idSolicitud}/estado`, body);
  }
}

