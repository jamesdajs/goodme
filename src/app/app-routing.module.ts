import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'adm', loadChildren: './adm/tabs/tabs.module#TabsPageModule' },
  { path: 'cli', loadChildren: './cli/tabs/tabs.module#TabsPageModule' },
  //{ path: 'crear-tipoejercicio', loadChildren: './adm/crear-tipoejercicio/crear-tipoejercicio.module#CrearTipoejercicioPageModule' },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
