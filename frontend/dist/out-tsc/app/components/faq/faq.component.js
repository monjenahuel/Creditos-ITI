import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
let FaqComponent = class FaqComponent {
};
FaqComponent = __decorate([
    Component({
        selector: 'app-faq',
        standalone: true,
        imports: [MatDialogModule, MatButtonModule, MatExpansionModule, CommonModule],
        templateUrl: './faq.component.html',
        styleUrl: './faq.component.css'
    })
], FaqComponent);
export { FaqComponent };
//# sourceMappingURL=faq.component.js.map