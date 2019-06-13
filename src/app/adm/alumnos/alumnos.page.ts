import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  constructor(private routes:Router) { }

  ngOnInit() {
  }
 veralumno(){
   this.routes.navigate(['/adm/misalumnos/alumnodetalle'])
 }
  
 listaralumnos(){
 
 }
}
