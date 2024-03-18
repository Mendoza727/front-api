import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { NavsComponent } from "../navs/navs.component";
import { GlobalService } from "src/app/global.service";
import { TitleService } from "src/app/services/title.service";
import { NgFor, NgIf } from "@angular/common";


@Component({
    selector: 'app-seguimientoGastos',
    templateUrl: './seguimientoGastos.component.html',
    styleUrls: ['./seguimientoGastos.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        NavsComponent,
        NgIf,
        NgFor
    ]
})
export class SeguimientoGastosComponent implements OnInit {
    activeTab = 'gastos'

    categoria: string = '';
    concepto: string = '';
    descripcion: string = '';
    fecha: string = '';
    monto: number = 0;

    dataGastos = new Array();

    constructor(
        private globalService: GlobalService,
        private titleService: TitleService,
        private spinnerService: NgxSpinnerService
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle('Seguimiento Gastos')

        this.consultarGastos()
    }

    setActiveTab(tab: string) {
        this.activeTab = tab;
    }



    saveGast() {
        this.spinnerService.show('sp5')

        const data = {
            crear_gasto: true,
            categoria: this.categoria,
            concepto: this.concepto,
            descripcion: this.descripcion,
            fecha: this.fecha,
            monto: this.monto
        };


        this.globalService.consultar('/seguimiento-gastos', data).subscribe(
            (response: any) => {
                if (response.status === 'success') {

                    // consultamos los datos
                    this.consultarGastos();


                    this.activeTab = 'gastos'
                    setTimeout(() => {
                        this.spinnerService.hide('sp5')
                    }, 250);
                } else {
                    setTimeout(() => {
                        this.spinnerService.hide('sp5');
                    }, 250)
                }
            },
            (error: any) => {
                console.error(error);

                setTimeout(() => {
                    this.spinnerService.hide('sp5');
                }, 250);
            }
        )
    }

    consultarGastos() {
        this.spinnerService.show('sp5');

        const data = {
            consultar_cita: true
        }

        this.globalService.consultar('/seguimiento-gastos', data).subscribe(
            async (response: any) => {
                if (response['status'] === 'success') {
                    this.dataGastos = await response.gastos

                    console.log(this.dataGastos);

                    setTimeout(() => {
                        this.spinnerService.hide('sp5');


                        // seteamos denuevo los datos
                        this.categoria = '';
                        this.concepto = '';
                        this.descripcion = '';
                        this.fecha = '';
                        this.monto = 0;
                    }, 250)
                }
            },
            (error: any) => {
                console.error("Error al consultar");
            }
        )
    }

}