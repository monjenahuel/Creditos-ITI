import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {

  private url = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() { 
    console.log('Consulta service is working');
  }

  postConsulta(consulta: any): Observable<any>{
    return this.http.post(`${this.url}/consulta`, consulta);
  }
}