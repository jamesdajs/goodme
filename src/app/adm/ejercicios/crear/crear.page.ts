import { Component, OnInit } from '@angular/core';
import { FotosService } from 'src/app/services/fotos.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {

  constructor(
    private fotos:FotosService
  ) { }

  ngOnInit() {
  }
  seleccionarImagenes(){
    this.fotos.escogerImagenes()
  }
}
