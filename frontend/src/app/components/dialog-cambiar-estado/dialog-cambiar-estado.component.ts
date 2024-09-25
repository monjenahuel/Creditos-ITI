import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { FaqComponent } from "../faq/faq.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SolicitudService } from '../../services/solicitud.service';



export interface Estado {
  id: number;
  descripcion: string;
}

@Component({
  selector: 'app-dialog-cambiar-estado',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatExpansionModule, CommonModule, MatFormFieldModule, MatSelectModule, FormsModule, MatInputModule],
  templateUrl: './dialog-cambiar-estado.component.html',
  styleUrl: './dialog-cambiar-estado.component.css'
})
export class DialogCambiarEstadoComponent {
  
  estado: Estado | undefined;
  estados: Estado[] = [];
  motivo_resolucion: string | undefined;


  constructor(
    public dialogRef: MatDialogRef<DialogCambiarEstadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dataService: DataService,
    private readonly solicitudService: SolicitudService
  ) {

    this.dataService.getEstados().subscribe({
      next: (estados: Estado[]) => {
        this.estados = estados;
        this.estado = this.estados.find((estado) => estado.id == data.estado.id)
        this.motivo_resolucion = data.motivo_resolucion;
      }
    });

  }

  ngOnInit(): void { }

  accept() {

    interface Body {
      estado: Estado;
      motivo_resolucion: string | undefined;
    }

    const body: Body = { estado: this.estado!, motivo_resolucion: this.motivo_resolucion };

    console.log("Body a enviar", body);

    if(this.estado?.descripcion != "Rechazada"){
      console.log("Estado no es rechazada");
      body.motivo_resolucion = undefined;
    }

    this.solicitudService.cambiarEstadoSolicitud(this.data.sol_id, body).subscribe({
      next: (response : any) => {
        console.log("Respuesta del servidor", response);
      },
    });

    this.dialogRef.close(body);
  }

  reject() {
    this.dialogRef.close();
  }
}

