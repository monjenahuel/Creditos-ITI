import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
let CargarSolicitudComponent = class CargarSolicitudComponent {
    constructor(fb, dataService, solicitudService, router) {
        // this.formulario = this.fb.group({
        //   dni: ['', [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
        //   nombre: ['', Validators.required],
        //   apellido: ['', Validators.required],
        //   email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-ñÑ]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
        //   area: [null, Validators.required],
        //   carrera: [null, Validators.required],
        //   actividad: [null, Validators.required],
        //   constancia: [null, Validators.required]
        // });
        this.fb = fb;
        this.dataService = dataService;
        this.solicitudService = solicitudService;
        this.router = router;
        this.selectedFile = null;
        this.carreras = [];
        this.areas = [];
        this.actividades = [];
        // TODO: Mock
        this.formulario = this.fb.group({
            dni: ['40510531', [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
            nombre: ['Nahuel', Validators.required],
            apellido: ['Monje', Validators.required],
            email: ['email@email.com', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-ñÑ]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
            area: ['', Validators.required],
            carrera: ['', Validators.required],
            actividad: ['', Validators.required],
            constancia: [null, Validators.required]
        });
    }
    ngOnInit() {
        this.dataService.getCarreras().subscribe((carreras) => {
            this.carreras = carreras;
        });
    }
    onFileSelected(event) {
        const file = event.target.files[0];
        console.log(file);
        if (file && this.fileValidType(file.type)) {
            this.selectedFile = file;
        }
        else {
            console.error("El archivo seleccionado no es un formato valido");
            this.formulario.get('constancia')?.setValue(null);
            this.formulario.get('constancia')?.setErrors({ invalidFileType: true });
        }
    }
    fileValidType(type) {
        return type === "application/pdf" ||
            type === "image/jpeg" ||
            type === "image/png";
    }
    onSubmit() {
        if (this.formulario.valid) {
            const formData = new FormData();
            formData.append('dni', this.formulario.get('dni')?.value);
            formData.append('nombre', this.formulario.get('nombre')?.value);
            formData.append('apellido', this.formulario.get('apellido')?.value);
            formData.append('email', this.formulario.get('email')?.value);
            formData.append('carrera_id', this.formulario.get('carrera')?.value.id);
            formData.append('area_cod', this.formulario.get('area')?.value.cod);
            formData.append('actividad_cod', this.formulario.get('actividad')?.value.cod);
            if (this.selectedFile) {
                formData.append('constancia', this.selectedFile, this.selectedFile.name);
            }
            this.solicitudService.postSolicitud(formData).subscribe({
                next: (response) => {
                    console.log(response);
                },
                error: (error) => {
                    console.log(error);
                }
            });
            this.router.navigate(['/home']);
        }
    }
    handleCarreraChange() {
        this.filtrarActividadesByCarrera();
        this.filtrarAreasPorCarrera();
    }
    handleAreaChange(event) {
        const selectedArea = event.value;
        this.filtrarActividadesByArea(selectedArea);
    }
    handleActividadChange(event) {
        const selectedActividad = event.value;
        //Busca y selecciona el area con el mismo codigo que el de la actividad seleccionada
        this.formulario.get('area')?.setValue(this.areas.find((area) => area.cod === selectedActividad.area.cod));
    }
    filtrarAreasPorCarrera() {
        const areasConRepetidos = this.formulario.get('carrera')?.value.actividades.map((actividad) => actividad.area);
        const codigosDeArea = new Set();
        this.areas = [];
        areasConRepetidos.forEach((area) => {
            if (!codigosDeArea.has(area.cod)) {
                codigosDeArea.add(area.cod); //Añade el codigo al set para no volver a repetir el area
                this.areas.push(area); //Añade el area al array de areas
            }
        });
    }
    filtrarActividadesByArea(area) {
        this.formulario.get('actividad')?.setValue('');
        this.actividades = this.formulario.get('carrera')?.value.actividades.filter((actividad) => actividad.area.cod === area.cod);
    }
    filtrarActividadesByCarrera() {
        if (this.formulario.get('carrera')?.value) {
            // Asegúrate de que el valor no es un string vacío, null o undefined
            console.log("Filtrando por Carrera");
            // Obtén el valor del campo 'carrera' del formulario
            const carreraValue = this.formulario.get('carrera')?.value;
            this.actividades = carreraValue.actividades;
        }
        else {
            this.actividades = [];
        }
    }
};
CargarSolicitudComponent = __decorate([
    Component({
        selector: 'app-cargar-solicitud',
        standalone: true,
        imports: [MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatOptionModule, MatSelect, MatCardModule, CommonModule, HttpClientModule],
        templateUrl: './cargar-solicitud.component.html',
        styleUrl: './cargar-solicitud.component.css'
    })
], CargarSolicitudComponent);
export { CargarSolicitudComponent };
//# sourceMappingURL=cargar-solicitud.component.js.map