import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { NavsComponent } from "../navs/navs.component";
import { GlobalService } from "src/app/global.service";
import { TitleService } from "src/app/services/title.service";


@Component({
    selector: 'app-seguimientoGastos',
    templateUrl: './seguimientoGastos.component.html',
    styleUrls: ['./seguimientoGastos.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        NavsComponent
    ]
})
export class SeguimientoGastosComponent implements OnInit {

    constructor(
        private globalService: GlobalService,
        private titleService: TitleService
    ) {}

    ngOnInit(): void {
        this.titleService.setTitle('Seguimiento Gastos')
    }

}