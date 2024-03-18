import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { NavsComponent } from "../navs/navs.component";
import { GlobalService } from "src/app/global.service";
import { TitleService } from "src/app/services/title.service";
import { NgIf } from "@angular/common";


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
        NgIf
    ]
})
export class GestionInventarioComponent implements OnInit {
    activeTab = 'formulario';

    nombre: string = '';
    descripcion: string = '';
    precio: number = 0;
    cantidad: number = 0;
    proveedor: string = '';

    constructor(
        private globalService: GlobalService,
        private titleService: TitleService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.titleService.setTitle('Seguimiento Inventario')
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



        
    }
}