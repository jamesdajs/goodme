import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlumnosdetallePage } from './alumnosdetalle.page';

const routes: Routes = [
  {
    path: '',
    component: AlumnosdetallePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AlumnosdetallePage]
})
export class AlumnosdetallePageModule {}
