import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { FaqComponent } from "../faq/faq.component";



@Component({
  selector: 'app-dialog-faq',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatExpansionModule, CommonModule, FaqComponent],
  templateUrl: './dialog-faq.component.html',
  styleUrl: './dialog-faq.component.css'
})
export class DialogFaqComponent {

  @Input() isDialog: boolean | undefined;

  constructor(public dialogRef: MatDialogRef<DialogFaqComponent>) {}

  ngOnInit(): void {
    this.isDialog = this.isDialog == undefined ? true : this.isDialog;
  }

  accept() {
    this.dialogRef.close(true);
  }

  reject() {
    this.dialogRef.close(false);
  }
}

