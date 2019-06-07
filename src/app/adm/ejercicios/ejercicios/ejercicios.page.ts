import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
})
export class EjerciciosPage implements OnInit {
  @ViewChild('lista') lista :IonList
  ejercicios=[]
  datos={
    idtipo_ejercicios:'',
    nombre:'',
    idusuario:''

  }
  constructor(
    private Aroute:ActivatedRoute,
    private router:Router
  ) { 

  }

  ngOnInit() {
  }
  crear(){
    this.router.navigate(['/adm/tipo-ejercicios/ejercicios/crear'])
  }
  ionViewWillEnter() {
    this.lista.closeSlidingItems()
    this.cargardatos()

  }
  cargardatos(){
    
  }

}
