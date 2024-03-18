import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { NavsComponent } from "../navs/navs.component";
import { GlobalService } from "src/app/global.service";
import { TitleService } from "src/app/services/title.service";
import { NgForOf, NgIf } from "@angular/common";


@Component({
    selector: 'app-gestionInventario',
    templateUrl: './gestionInventario.component.html',
    styleUrls: ['./gestionInventario.component.scss'],
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
export class GestionInventarioComponent implements OnInit {
    activeTab = 'productos';

    nombre: string = '';
    descripcion: string = '';
    precio: number = 0;
    cantidad: number = 0;
    proveedor: string = '';

    dataInventario = new Array();

    constructor(
        private globalService: GlobalService,
        private titleService: TitleService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.titleService.setTitle('Seguimiento Inventario')

        this.consultarProductos();
    }


    setActiveTab(tab: string) {
        this.activeTab = tab;
    }


    saveProduct() {
        this.spinner.show('sp5')

        const data = {
            save_producto: true,
            nombre: this.nombre,
            descripcion: this.descripcion,
            precio: this.precio,
            cantidad: this.cantidad,
            proveedor: this.globalService.DatosUsuario['name'] + ' ' + this.globalService.DatosUsuario['lastname']
        }



        this.globalService.consultar('/gestion-inventario', data).subscribe(
            (response: any) => {
                if (response.status === 'success') {

                    //consultamos los datos
                    this.consultarProductos();


                    this.activeTab = 'productos'
                    setTimeout(() => {
                        this.spinner.hide('sp5')
                    }, 250);
                } else {
                    setTimeout(() => {
                        this.spinner.hide('sp5');
                    }, 250)
                }
            },
            (err: any) => {
                console.error('Error al guardar el evento');

                setTimeout(() => {
                    this.spinner.hide('sp5');
                }, 250);
            }
         )
    }

    consultarProductos() {
        this.spinner.show('sp5');

        const data = {
            consult_productos: true
        }


        this.globalService.consultar('/gestion-inventario', data).subscribe(
            async(response: any) => {
                if (response['status'] === 'success') {
                    this.dataInventario = await response.productos

                    console.log(this.dataInventario);

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