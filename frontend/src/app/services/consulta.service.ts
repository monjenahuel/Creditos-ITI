import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {

  private url = 'http://localhost:3000/consulta';
  private http = inject(HttpClient);

  constructor() { 
    console.log('Consulta service is working');
  }

  postConsulta(consulta: any): Observable<any>{
    return this.http.post(this.url, consulta);
  }
}