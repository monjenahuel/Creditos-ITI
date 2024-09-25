import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private dataUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getCarreras(): Observable<any>{
    return this.http.get(this.dataUrl+'/carrera');
  }

  getEstados(): Observable<any>{
    return this.http.get(this.dataUrl+'/estado');
  }
}
