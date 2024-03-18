import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { StorageService } from "src/app/services/storage.service";
import { GlobalService } from '../../global.service';
import { Route, Router } from '@angular/router';
import { NavsComponent } from "../navs/navs.component";
import { TitleService } from "src/app/services/title.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        NavsComponent,
        CommonModule
    ]
})
export class HomeComponent implements OnInit {
    rutas: { title: string, url: string }[] = [];

    constructor(
        private sessionStorage: StorageService,
        public globalService: GlobalService,
        private titleService: TitleService,
        public router: Router
    ) {}

    ngOnInit(): void {
        const desencriptedData = this.sessionStorage.decryptData(localStorage.getItem('user'));

        if (desencriptedData !== null) {
            this.globalService.DatosUsuario = desencriptedData;
            console.log(this.globalService.DatosUsuario);
        }

        this.obtenerRutas();
    }

    obtenerRutas(): void {
        const rutas = this.router.config;
        this.rutas = rutas
            .filter(route => route.path !== '' && route.path !== '**' && route.data && route.data['title'])
            .map(route => ({ title: route.data!['title'], url: '/' + route.path }));

        // obtenemos el titulo de las rutas
        if (this.rutas.length > 0) {
            const titulo = this.rutas[0].title;
            this.titleService.setTitle(titulo);
        }
    }

}