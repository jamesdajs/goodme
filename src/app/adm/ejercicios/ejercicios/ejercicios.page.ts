import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonList } from '@ionic/angular';
import { Observable } from 'rxjs';
import { RutinaProvider } from 'src/app/services/rutina/rutina';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
})
export class EjerciciosPage implements OnInit {
  @ViewChild('lista') lista: IonList
  ejercicios:Observable<[]> 
  datos = {
    idtipo_ejercicios: '',
    nombre: '',
    idusuario: ''

  }
  constructor(
    private Aroute: ActivatedRoute,
    private router: Router,
    private rutina:RutinaProvider
  ) {
    for (let i in this.datos)
      this.datos[i] = this.Aroute.snapshot.paramMap.get(i)

  }

  ngOnInit() {
  }
  crear() {
    this.router.navigate(['/adm/tipo-ejercicios/ejercicios/crear', this.datos])
  }
  ionViewWillEnter() {
    this.lista.closeSlidingItems()
    this.cargardatos()

  }
  cargardatos() {
    this.ejercicios=this.rutina.listarEjercicio(this.datos.idtipo_ejercicios)
  }

}
