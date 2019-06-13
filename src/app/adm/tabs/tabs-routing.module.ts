import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:
      [
        {
          path: 'cursos',
          children:
            [
              {
                path: '',
                loadChildren: '../miscursos/miscursos.module#MiscursosPageModule'
              },
              {
                path: 'crearcurso',
                loadChildren: '../crearcurso/crearcurso.module#CrearcursoPageModule'
              },

            ]
        },
        {
          path: 'misalumnos',
          children:
            [
              {
                path: '',
                loadChildren: '../alumnos/alumnos.module#AlumnosPageModule'
              },
              {
                path: 'alumnodetalle',
                loadChildren: '../alumnosdetalle/alumnosdetalle.module#AlumnosdetallePageModule'
              },
            ]
        },
        {
          path: 'perfil',
          children:
            [
              {
                path: '',
                loadChildren: '../perfil/perfil.module#PerfilPageModule'

              },

              {
                path: 'mod-perfil',
                loadChildren: '../mod-perfil/mod-perfil.module#ModPerfilPageModule'
              },
            ]
        },
        {
          path: 'tipo-ejercicios',
          children:
            [
              {
                path: '',
                loadChildren: '../tipo-ejercicios/tipo-ejercicios.module#TipoEjerciciosPageModule'
              },
              {
                path: 'crear',
                loadChildren: '../crear-tipoejercicio/crear-tipoejercicio.module#CrearTipoejercicioPageModule'
              },

              {
                path: 'ejercicios',
                children: [
                  {
                    path: '',
                    loadChildren: '../ejercicios/ejercicios/ejercicios.module#EjerciciosPageModule'
                  },

                  {
                    path: 'crear',
                    loadChildren: '../ejercicios/crear/crear.module#CrearPageModule'
                  },
                  {
                    path: 'modificar',
                    loadChildren: '../ejercicios/modificar/modificar.module#ModificarPageModule'
                  },
                  {
                    path: 'detalle',
                    loadChildren: './adm/ejercicios/detalle/detalle.module#DetallePageModule'
                  },


                ]
              },
            ]
        },

        {
          path: '',
          redirectTo: '/adm/cursos',
          pathMatch: 'full'
        }
      ]
  },
  {
    path: '',
    redirectTo: '/adm/cursos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports:
    [
      RouterModule.forChild(routes)
    ],
  exports:
    [
      RouterModule
    ]
})
export class TabsPageRoutingModule { }