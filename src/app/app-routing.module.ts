import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'adm', loadChildren: './adm/tabs/tabs.module#TabsPageModule' },
  { path: 'cli', loadChildren: './cli/tabs/tabs.module#TabsPageModule' },
  { path: 'ejercicios', loadChildren: './adm/ejercicios/ejercicios.module#EjerciciosPageModule' },
  { path: 'alumnos', loadChildren: './adm/alumnos/alumnos.module#AlumnosPageModule' },  { path: 'alumnosdetalle', loadChildren: './adm/alumnosdetalle/alumnosdetalle.module#AlumnosdetallePageModule' },
  { path: 'miscursos', loadChildren: './adm/miscursos/miscursos.module#MiscursosPageModule' },
  { path: 'inicio', loadChildren: './cli/inicio/inicio.module#InicioPageModule' },
  { path: 'mycourses', loadChildren: './cli/mycourses/mycourses.module#MycoursesPageModule' },
  { path: 'vermicurso', loadChildren: './cli/vermicurso/vermicurso.module#VermicursoPageModule' },
  { path: 'verejercicio', loadChildren: './cli/verejercicio/verejercicio.module#VerejercicioPageModule' },
  { path: 'vercurso', loadChildren: './cli/vercurso/vercurso.module#VercursoPageModule' },
  { path: 'detallepago', loadChildren: './cli/detallepago/detallepago.module#DetallepagoPageModule' },
  { path: 'miperfil', loadChildren: './cli/miperfil/miperfil.module#MiperfilPageModule' },
  { path: 'ver-instructor', loadChildren: './cli/ver-instructor/ver-instructor.module#VerInstructorPageModule' },

 
  //{ path: 'crear-tipoejercicio', loadChildren: './adm/crear-tipoejercicio/crear-tipoejercicio.module#CrearTipoejercicioPageModule' },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
