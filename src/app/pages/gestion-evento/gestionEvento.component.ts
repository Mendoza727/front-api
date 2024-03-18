import { Component, HostListener, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { NavsComponent } from "../navs/navs.component";
import { GlobalService } from "src/app/global.service";
import { TitleService } from '../../services/title.service';
import { NgFor, NgForOf, NgIf } from "@angular/common";
import { StorageService } from "src/app/services/storage.service";


@Component({
    selector: 'app-gestionEvento',
    templateUrl: './gestionEvento.component.html',
    styleUrls: ['./gestionEvento.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        NavsComponent,
        NgIf,
        NgFor,
        NgForOf
    ]
})
export class GestionEventoComponent implements OnInit {
    activeTab: string = 'informacion';

    titulo: string = '';
    descripcion: string = '';
    fecha = new Date();
    hora: any;
    ubicacion: string = '';


    dataEventos = new Array();

    constructor(
        private globalService: GlobalService,
        private titleService: TitleService,
        private spinner: NgxSpinnerService,

    ) { }

    @HostListener('document:keydown', ['$event'])
    handleKeyBoard(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.registrarEvento();
        }
    }

    ngOnInit(): void {
        this.titleService.setTitle('Seguimiento Evento')

        this.consultarEvento();
    }

    setActiveTab(tab: string) {
        this.activeTab = tab;
    }


    registrarEvento() {
        this.spinner.show('sp5')
        const data = {
            save: true,
            event: true,
            titulo: this.titulo,
            descripcion: this.descripcion,
            fecha: this.fecha,
            hora: this.hora,
            ubicacion: this.ubicacion
        };


        this.globalService.consultar('/gestion-eventos', data).subscribe(
            (response: any) => {
                if (response.status === 'success') {

                    // consultamos los datos
                    this.consultarEvento()

                    this.activeTab = 'informacion'
                    setTimeout(() => {
                        this.spinner.hide();
                    }, 250)
                } else {
                    setTimeout(() => {
                        this.spinner.hide();
                    }, 250)
                }
            },
            (error: any) => {
                console.error('Error al guardar el evento');

                setTimeout(() => {
                    this.spinner.hide();
                }, 250)
            }
        )
    }


    consultarEvento() {
        this.spinner.show('sp5')
        const data = {
            save: false,
            event: false,
            consultEvent: true
        }

        this.globalService.consultar('/gestion-eventos', data).subscribe(
            async (response: any) => {
                if (response['status'] === 'success') {
                    this.dataEventos = await response['events']

                    console.log(this.dataEventos);

                    setTimeout(() => {
                        this.spinner.hide('sp5');
                    }, 250)
                }
            },
            (error: any) => {
                console.error("Error al consultar");
            }
        )
    }
}