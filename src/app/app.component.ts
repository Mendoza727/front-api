import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { GlobalService } from './global.service';
import { TitleService } from './services/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mostrarNav: boolean = true;
  rutas: { title: string, url: string }[] = [];

  constructor(private sessionStorage: StorageService,
    public globalService: GlobalService,
    private titleService: TitleService,
    public router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.mostrarNav = !event.url.includes('login') || !event.url.includes(''); // Ocultar el nav si la URL contiene 'login'
      }
    });
  }

  ngOnInit(): void {
    const desencriptedData = this.sessionStorage.decryptData(localStorage.getItem('user'));

    if (desencriptedData !== null) {
      this.globalService.DatosUsuario = desencriptedData;
      console.log(this.globalService.DatosUsuario);
    }


    this.obtenerRutas();
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();

    // redirigimos al inicio de sesion
    this.router.navigateByUrl('/login')
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
}
