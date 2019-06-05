import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tipo-ejercicios',
  templateUrl: './tipo-ejercicios.page.html',
  styleUrls: ['./tipo-ejercicios.page.scss'],
})
export class TipoEjerciciosPage implements OnInit {
  tipoejer=[
    {nombre:"hombro"},
    {nombre:"brazos"},
    {nombre:"piernas"}
  ]
  tipos=[]
  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }
  crear(){
    this.router.navigate(["/adm/tipo-ejercicios/crear"])
  }
}
