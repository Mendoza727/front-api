import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { NavsComponent } from "../navs/navs.component";
import { GlobalService } from "src/app/global.service";
import { TitleService } from "src/app/services/title.service";


@Component({
    selector: 'app-reservaCitas',
    templateUrl: './reservaCitas.component.html',
    styleUrls: ['./reservaCitas.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        NavsComponent
    ]
})
export class ReservaCitasComponent implements OnInit {

    constructor(
        private globalService: GlobalService,
        private titleService: TitleService
    ) {}

    ngOnInit(): void {
        this.titleService.setTitle('Reservar Citas')
    }

}