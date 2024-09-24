import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private dataUrl = 'http://localhost:3000/api/carrera';
  private http = inject(HttpClient);

  getCarreras(): Observable<any>{
    return this.http.get(this.dataUrl);
  }

  getEstados(): Observable<any>{
    return this.http.get('http://localhost:3000/api/estado');
  }
}
