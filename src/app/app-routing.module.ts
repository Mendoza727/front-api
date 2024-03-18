import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./pages/auth/auth.component";
import { HomeComponent } from "./pages/home/home.component";
import { VigilantGuard } from "./vigilant.guard";
import { NgModule } from "@angular/core";
import { GestionEventoComponent } from "./pages/gestion-evento/gestionEvento.component";
import { GestionInventarioComponent } from "./pages/gestion-inventario/gestionInventario.component";
import { ReservaCitasComponent } from "./pages/reserva-citas/reservaCitas.component";
import { SeguimientoGastosComponent } from "./pages/seguimiento-gastos/seguimientoGastos.component";

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige '/' a '/login'
  
  { path: 'home', component: HomeComponent, canActivate: [VigilantGuard], data: { title: 'home'}},
  { path: 'gestion-evento', component: GestionEventoComponent, canActivate: [VigilantGuard], data: {title: 'gestion evento'}},
  { path: 'gestion-inventario', component: GestionInventarioComponent, canActivate: [VigilantGuard], data: {title: 'gestion inventario'}},
  { path: 'reserva-citas', component: ReservaCitasComponent, canActivate: [VigilantGuard], data: {title: 'reserva citas'}},
  { path: 'seguimiento-gastos', component: SeguimientoGastosComponent, canActivate: [VigilantGuard], data: { title: 'seguimiento gastos'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
