import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private url = environment.apiUrl
  private http = inject(HttpClient);


  postSolicitud(solicitud: any): Observable<any>{
    console.log("Enviando FormData", solicitud);
    return this.http.post(`${this.url}/solicitud`,solicitud);
  }

  getAllSolicitudes(): Observable<any>{
    return this.http.get(`${this.url}/solicitud`);
  }

  getSolicitudByEstadoId(estadoId: number): Observable<any>{
    return this.http.get(`${this.url}/solicitud/estado/${estadoId}`);
  }

  getSolicitudByDni(dni: number): Observable<any>{ 
    return this.http.get(`${this.url}/solicitud/dni/${dni}`);
  }

  downloadConstanciaBySolicitudId(id: string) {
    return this.http.get(`${this.url}/solicitud/${id}/constancia`, {
      responseType: 'blob'
    });
  }

  cambiarEstadoSolicitud(idSolicitud: string, body: any): Observable<any> {
    console.log("Enviando body", body);
    return this.http.patch(`${this.url}/solicitud/${idSolicitud}/estado`, body);
  }
}

