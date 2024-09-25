import { __decorate } from "tslib";
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
let SolicitudService = class SolicitudService {
    constructor() {
        this.url = environment.apiUrl;
        this.http = inject(HttpClient);
    }
    postSolicitud(solicitud) {
        console.log("Enviando FormData", solicitud);
        console.log("URL", `${this.url}/solicitud`);
        return this.http.post(`${this.url}/solicitud`, solicitud);
    }
    getAllSolicitudes() {
        return this.http.get(`${this.url}/solicitud`);
    }
    getSolicitudByEstadoId(estadoId) {
        return this.http.get(`${this.url}/solicitud/estado/${estadoId}`);
    }
    downloadConstanciaBySolicitudId(id) {
        return this.http.get(`${this.url}/solicitud/${id}/constancia`, {
            responseType: 'blob' // Indicamos que la respuesta es un blob
        });
    }
    cambiarEstadoSolicitud(idSolicitud, body) {
        return this.http.patch(`${this.url}/solicitud/${idSolicitud}/estado`, body);
    }
};
SolicitudService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SolicitudService);
export { SolicitudService };
//# sourceMappingURL=solicitud.service.js.map