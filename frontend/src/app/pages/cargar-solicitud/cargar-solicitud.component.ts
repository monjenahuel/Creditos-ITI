import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { Area } from '../../models/Area';
import { Actividad } from '../../models/Actividad';
import { Carrera } from '../../models/Carrera';
import { SolicitudService } from '../../services/solicitud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cargar-solicitud',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatOptionModule, MatSelect, MatCardModule, CommonModule, HttpClientModule],
  templateUrl: './cargar-solicitud.component.html',
  styleUrl: './cargar-solicitud.component.css'
})
export class CargarSolicitudComponent {

  formulario: FormGroup;
  selectedFile: File | null = null;
  carreras: Carrera[] = [];
  areas: Area[] = [];
  actividades: Actividad[] = [];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private solicitudService: SolicitudService,
    private router: Router
  ) {

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

  ngOnInit(): void {

    this.dataService.getCarreras().subscribe((carreras: Carrera[]) => {
      this.carreras = carreras;
    },);

  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);

    if (file && this.fileValidType(file.type) ) {
      this.selectedFile = file;
    }else{
      console.error("El archivo seleccionado no es un formato valido")
      this.formulario.get('constancia')?.setValue(null);
      this.formulario.get('constancia')?.setErrors({invalidFileType: true});
    }

  }

  fileValidType(type: string): boolean {
    return  type === "application/pdf" || 
            type === "image/jpeg" ||
            type === "image/png"
  }

  onSubmit(): void {
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
        next: (response: any) => {
          console.log(response);
        },
        error: (error: any) => {
          console.log(error);
        }
      });

      this.router.navigate(['/home']);
    }
  }

    handleCarreraChange() {
      this.filtrarActividadesByCarrera()
      this.filtrarAreasPorCarrera()
    }

    handleAreaChange(event: any): void {
      const selectedArea = event.value;
      this.filtrarActividadesByArea(selectedArea)
    }

    handleActividadChange(event: any): void {
      const selectedActividad = event.value;

      //Busca y selecciona el area con el mismo codigo que el de la actividad seleccionada
      this.formulario.get('area')?.setValue(this.areas.find((area: Area) => area.cod === selectedActividad.area.cod));
    }

    filtrarAreasPorCarrera(): void {
      const areasConRepetidos: Area[] = this.formulario.get('carrera')?.value.actividades.map((actividad: Actividad) => actividad.area)

    const codigosDeArea = new Set<string>();
      this.areas = []

    areasConRepetidos.forEach((area: Area) => {
        if (!codigosDeArea.has(area.cod)) {
          codigosDeArea.add(area.cod) //Añade el codigo al set para no volver a repetir el area
          this.areas.push(area) //Añade el area al array de areas
        }
      }
      )
    }

    filtrarActividadesByArea(area: Area): void {
      this.formulario.get('actividad')?.setValue('')
    this.actividades = this.formulario.get('carrera')?.value.actividades.filter((actividad: Actividad) => actividad.area.cod === area.cod)
    }

    filtrarActividadesByCarrera(): void {

      if(this.formulario.get('carrera')?.value) {
      // Asegúrate de que el valor no es un string vacío, null o undefined
      console.log("Filtrando por Carrera");

      // Obtén el valor del campo 'carrera' del formulario
      const carreraValue = this.formulario.get('carrera')?.value;

      this.actividades = carreraValue.actividades;

    } else {
      this.actividades = []
    }

  }

}
