import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { FaqComponent } from '../../components/faq/faq.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
let HomeComponent = class HomeComponent {
    constructor(router) {
        this.router = router;
    }
    navigateTo(route) {
        this.router.navigate([route]);
    }
    test() {
        console.log('test');
    }
};
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        standalone: true,
        imports: [
            MatButtonModule,
            MatCardModule,
            MatButtonModule,
            MatSlideToggleModule,
            MatIconModule,
            MatListModule,
            MatExpansionModule,
            FaqComponent,
            NavbarComponent
        ],
        templateUrl: './home.component.html',
        styleUrl: './home.component.css'
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map