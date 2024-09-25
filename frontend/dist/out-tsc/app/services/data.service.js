import { __decorate } from "tslib";
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
let DataService = class DataService {
    constructor() {
        this.dataUrl = environment.apiUrl;
        this.http = inject(HttpClient);
    }
    getCarreras() {
        return this.http.get(`${this.dataUrl}/carrera`);
    }
    getEstados() {
        return this.http.get(`${this.dataUrl}/estado`);
    }
};
DataService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], DataService);
export { DataService };
//# sourceMappingURL=data.service.js.map