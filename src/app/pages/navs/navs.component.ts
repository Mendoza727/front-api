import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ROUTES, Router, Routes } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GlobalService } from 'src/app/global.service';
import { StorageService } from 'src/app/services/storage.service';
import { TitleService } from '../../services/title.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
    selector: 'app-navs',
    templateUrl: './navs.component.html',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        CommonModule,
        NgFor
    ]
})
export class NavsComponent implements OnInit {
    data: any;
    rutas: { title: string, url: string }[] = [];

    constructor(
        private sessionStorage: StorageService,
        public globalService: GlobalService,
        private titleService: TitleService,
        public router: Router
    ) { }

    ngOnInit(): void {
        const desencriptedData = this.sessionStorage.decryptData(localStorage.getItem('user'));

        if (desencriptedData !== null) {
            this.globalService.DatosUsuario = desencriptedData;
            console.log(this.globalService.DatosUsuario);
        }
        this.obtenerRutas();
    }


    goToHome() {
        this.router.navigateByUrl('/home')
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

    esRutaActiva(url: string): boolean {
        return this.router.url === url;
    }



    logout() {
        sessionStorage.clear();
        localStorage.clear();

        // redirigimos al inicio de sesion
        this.router.navigateByUrl('/login')
    }
}
