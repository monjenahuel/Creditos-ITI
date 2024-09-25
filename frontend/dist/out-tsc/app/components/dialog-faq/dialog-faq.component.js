import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { FaqComponent } from "../faq/faq.component";
let DialogFaqComponent = class DialogFaqComponent {
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
    }
    ngOnInit() {
        this.isDialog = this.isDialog == undefined ? true : this.isDialog;
    }
    accept() {
        this.dialogRef.close(true);
    }
    reject() {
        this.dialogRef.close(false);
    }
};
__decorate([
    Input()
], DialogFaqComponent.prototype, "isDialog", void 0);
DialogFaqComponent = __decorate([
    Component({
        selector: 'app-dialog-faq',
        standalone: true,
        imports: [MatDialogModule, MatButtonModule, MatExpansionModule, CommonModule, FaqComponent],
        templateUrl: './dialog-faq.component.html',
        styleUrl: './dialog-faq.component.css'
    })
], DialogFaqComponent);
export { DialogFaqComponent };
//# sourceMappingURL=dialog-faq.component.js.map