import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../components/dialog-cambiar-estado/dialog-cambiar-estado.component';
import { Solicitud } from '../models/Solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
 
  private url = 'http://localhost:3000/api/solicitud';
  private http = inject(HttpClient);


  postSolicitud(solicitud: any): Observable<any>{
    console.log("Enviando FormData", solicitud);
    return this.http.post(this.url, solicitud);
  }

  getAllSolicitudes(): Observable<any>{
    return this.http.get(this.url);
  }

  getSolicitudByEstadoId(estadoId: number): Observable<any>{
    return this.http.get(`${this.url}/estado/${estadoId}`);
  }

  downloadConstanciaBySolicitudId(id: string) {
    return this.http.get(`${this.url}/${id}/constancia`, {
      responseType: 'blob'  // Indicamos que la respuesta es un blob
    });
  }

  cambiarEstadoSolicitud(idSolicitud: string, body: any): Observable<any> {
    console.log("Enviando body", body);
    return this.http.patch(`${this.url}/${idSolicitud}/estado`, body);
  }
}

