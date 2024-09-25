import { __decorate } from "tslib";
import { Component, inject } from '@angular/core';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogFaqComponent } from '../../components/dialog-faq/dialog-faq.component';
import { CreateConsulta } from '../../models/CreateConsulta';
import { Estudiante } from '../../models/Estudiante';
import { Carrera } from '../../models/Carrera';
let CargarConsultaComponent = class CargarConsultaComponent {
    constructor(fb, dataService, consultaService, router) {
        this.fb = fb;
        this.dataService = dataService;
        this.consultaService = consultaService;
        this.router = router;
        this.carreras = [];
        this.dialog = inject(MatDialog);
        this.formularioConsulta = this.fb.group({
            dni: ['', [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
            nombre: ['', Validators.required],
            apellido: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-ñÑ]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
            carrera: ['', Validators.required],
            consulta: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1500)]],
            check: [false, Validators.required],
        });
        //TODO: Mock
        this.formularioConsulta = this.fb.group({
            dni: ['40510531', [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
            nombre: ['Ricardo', Validators.required],
            apellido: ['Darin', Validators.required],
            email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-ñÑ]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
            carrera: ['', Validators.required],
            consulta: ['Sint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ipSint dolore irure ip', [Validators.required, Validators.minLength(20), Validators.maxLength(1500)]],
            check: [false, Validators.required],
        });
    }
    ngOnInit() {
        this.dataService.getCarreras().subscribe((carreras) => {
            this.carreras = carreras;
            this.formularioConsulta.patchValue({ carrera: carreras[0] }); //TODO: Que pasa si saco esto?
        });
    }
    onSubmit() {
        if (this.formularioConsulta.valid) {
            const formData = new FormData();
            formData.append('dni', this.formularioConsulta.get('dni')?.value);
            formData.append('nombre', this.formularioConsulta.get('nombre')?.value);
            formData.append('apellido', this.formularioConsulta.get('apellido')?.value);
            formData.append('email', this.formularioConsulta.get('email')?.value);
            formData.append('carrera', this.formularioConsulta.get('carrera')?.value);
            formData.append('consulta', this.formularioConsulta.get('consulta')?.value);
            formData.append('fecha', new Date().toISOString());
            // Convertir FormData a JSON
            let jsonObject = {};
            formData.forEach((value, key) => {
                jsonObject[key] = value;
            });
            console.log('JSON Object:', jsonObject);
            console.log(this.formularioConsulta.get('carrera')?.value);
            const carreraForm = this.formularioConsulta.get('carrera')?.value;
            const carrera = new Carrera(carreraForm.id, carreraForm.nombre);
            const estudiante = new Estudiante(parseInt(jsonObject.dni), jsonObject.nombre, jsonObject.apellido, jsonObject.email);
            let consulta = new CreateConsulta(jsonObject.consulta, carrera, estudiante);
            console.log("Consulta tranformada en DTO:", consulta);
            this.consultaService.postConsulta(consulta).subscribe((data) => {
                console.log('Repuesta del post:', data);
            });
            this.router.navigate(['/home']);
        }
    }
    openFAQ() {
        this.formularioConsulta.patchValue({ check: false });
        const dialogRef = this.dialog.open(DialogFaqComponent);
        dialogRef.afterClosed().subscribe(result => {
            this.formularioConsulta.patchValue({ check: result });
        });
    }
};
CargarConsultaComponent = __decorate([
    Component({
        selector: 'app-cargar-consulta',
        standalone: true,
        imports: [MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatOptionModule, MatSelect, MatCardModule, CommonModule, HttpClientModule, MatCheckboxModule, MatDialogModule],
        templateUrl: './cargar-consulta.component.html',
        styleUrl: './cargar-consulta.component.css'
    })
], CargarConsultaComponent);
export { CargarConsultaComponent };
//# sourceMappingURL=cargar-consulta.component.js.map