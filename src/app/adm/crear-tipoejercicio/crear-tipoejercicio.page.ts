import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-crear-tipoejercicio',
  templateUrl: './crear-tipoejercicio.page.html',
  styleUrls: ['./crear-tipoejercicio.page.scss'],
})
export class CrearTipoejercicioPage implements OnInit {
  nombre =""
  myForm:FormGroup
  constructor(
    private formb:FormBuilder
  ) { 
    this.myForm = this.formb.group({
      nombre: ['', [Validators.required,Validators.maxLength(50)]]
    });
  }

  ngOnInit() {
  }

}
