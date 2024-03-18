import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
  } from "@angular/router";
import { GlobalService } from "./global.service";
import { StorageService } from "./services/storage.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: "root",
})
export class VigilantGuard implements CanActivate {
    constructor(
        public global: GlobalService, 
        public router: Router, 
        public storageService: StorageService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {

            try {
                const logginDesencrypted = this.storageService.decryptData(sessionStorage.getItem('logged')?.toString())

                if (logginDesencrypted === 'true') {
                    return true
                } else {
                    return this.router.navigateByUrl('login')
                }
            } catch (err) {
                console.error(err);
                return false;
            }

        }
}