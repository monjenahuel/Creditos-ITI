import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
let NavbarComponent = class NavbarComponent {
    constructor(router) {
        this.router = router;
        this.isHome = false;
    }
    goBack() {
        this.router.navigate(['/home']);
    }
    goCustom() {
        this.router.navigate(['/gestion-solicitudes']);
    }
};
NavbarComponent = __decorate([
    Component({
        selector: 'app-navbar',
        standalone: true,
        imports: [
            MatToolbarModule,
            MatIconModule,
            CommonModule,
            MatButtonModule
        ],
        templateUrl: './navbar.component.html',
        styleUrl: './navbar.component.css',
    })
], NavbarComponent);
export { NavbarComponent };
//# sourceMappingURL=navbar.component.js.map