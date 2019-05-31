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
          path: 'datos-personales',
          children:
            [
              {
                path: '',
                loadChildren: './../datos-personales/datos-personales.module#DatosPersonalesPageModule'
                
              }
            ]
        },
        {
          path: '',
          redirectTo: '/cli/datos-personales',
          pathMatch: 'full'
        }
      ]
  },
  {
    path: '',
    redirectTo: '/cli/datos-personales',
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
export class TabsPageRoutingModule {}