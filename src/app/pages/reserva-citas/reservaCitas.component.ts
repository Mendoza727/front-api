import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { NavsComponent } from "../navs/navs.component";
import { GlobalService } from "src/app/global.service";
import { TitleService } from "src/app/services/title.service";
import { NgForOf, NgIf } from "@angular/common";


@Component({
    selector: 'app-reservaCitas',
    templateUrl: './reservaCitas.component.html',
    styleUrls: ['./reservaCitas.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        NavsComponent,
        NgIf,
        NgForOf
    ]
})
export class ReservaCitasComponent implements OnInit {
    activeTab = 'citas';

    tipoCita: string = '';
    hora: string = '';
    fecha: string = '';
    nota: string = '';

    dataCitas = new Array();

    constructor(
        private globalService: GlobalService,
        private titleService: TitleService,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle('Reservar Citas')

        this.consultarCitas();
    }

    setActiveTab(tab: string) {
        this.activeTab = tab;
    }

    saveDating() {
        this.spinner.show('sp5')

        const data = {
            crear_cita: true,
            tipo_cita: this.tipoCita,
            hora: this.hora,
            fecha: this.fecha,
            nota: this.nota,
            id_usuario: this.globalService.DatosUsuario['id']
        };


        this.globalService.consultar('/reserva-citas', data).subscribe(
            (response: any) => {
                if (response.status === 'success') {

                    // consultamos los datos
                    this.consultarCitas();


                    this.activeTab = 'citas'
                    setTimeout(() => {
                        this.spinner.hide('sp5')
                    }, 250);
                } else {
                    setTimeout(() => {
                        this.spinner.hide('sp5');
                    }, 250)
                }
            },
            (error: any) => {
                console.error(error);

                setTimeout(() => {
                    this.spinner.hide('sp5');
                }, 250);
            }
        )
    }

    consultarCitas() {
        this.spinner.show('sp5');

        const data = {
            consultar_cita: true
        }

        this.globalService.consultar('/reserva-citas', data).subscribe(
            async (response: any) => {
                if (response['status'] === 'success') {
                    this.dataCitas = await response.cita

                    console.log(this.dataCitas);

                    setTimeout(() => {
                        this.spinner.hide('sp5');


                        // seteamos denuevo los datos
                        this.tipoCita = ''
                        this.hora = '';
                        this.fecha = '';
                        this.nota = '';
                    }, 250)
                }
            },
            (error: any) => {
                console.error("Error al consultar");
            }
        )
    }
}