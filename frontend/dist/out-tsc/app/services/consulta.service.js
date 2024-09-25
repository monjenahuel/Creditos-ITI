import { __decorate } from "tslib";
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
let ConsultaService = class ConsultaService {
    constructor() {
        this.url = environment.apiUrl;
        this.http = inject(HttpClient);
        console.log('Consulta service is working');
    }
    postConsulta(consulta) {
        return this.http.post(`${this.url}/consulta`, consulta);
    }
};
ConsultaService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ConsultaService);
export { ConsultaService };
//# sourceMappingURL=consulta.service.js.map