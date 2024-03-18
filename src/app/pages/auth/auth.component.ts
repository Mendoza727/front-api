import { Component, HostListener, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { GlobalService } from "src/app/global.service";

import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { StorageService } from "src/app/services/storage.service";
import { Route, Router } from '@angular/router';



@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
    ]
})
export class AuthComponent implements OnInit {
    email: string = '';
    password: string = '';

    IsLogged: Boolean = false;


    constructor(
        private globalService: GlobalService,
        private spinner: NgxSpinnerService,
        private storageService: StorageService,
        private router: Router
    ) {}

    @HostListener("document:keydown", ["$event"])
    handleKeyBoard(event: KeyboardEvent) {
        if (event.key === "Enter") {
            this.login();
        }
    }

    ngOnInit(): void { }



    login() {
        this.spinner.show('sp5')
        const data = {
            email: this.email,
            password: this.password
        };

        this.globalService.consultar('/auth', data).subscribe(
            (response: any) => {
                if(response.status === 'success') {
                    const dataEncripted = this.storageService.encryptData(response.user)
                    localStorage.setItem('user', dataEncripted);

                    this.IsLogged=true;
                    const loginEncripted = this.storageService.encryptData(this.IsLogged.toString());
                    sessionStorage.setItem('logged', loginEncripted);


                    this.router.navigateByUrl('/home');
                    setTimeout(() => {
                        this.spinner.hide();
                    }, 250);
                }
            },
            (error: any) => {
                console.error('Error en la autenticación:', error);
            }
        );
    }
}