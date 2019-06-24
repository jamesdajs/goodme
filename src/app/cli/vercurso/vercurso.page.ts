import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vercurso',
  templateUrl: './vercurso.page.html',
  styleUrls: ['./vercurso.page.scss'],
})
export class VercursoPage implements OnInit {

  datos
  comision
  constructor(private routes:Router) { 
    this.datos=this.routes.getCurrentNavigation().extras
  }
  showToolbar = false;
  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
    const scrollTop = $event.detail.scrollTop;
    this.showToolbar = scrollTop >= 225;
    }
    }

  ngOnInit() {
  }
  ionViewWillEnter() {

  }
 

  detallepago(costo){
    this.comision= (costo*0.03)/100
    this.routes.navigate(['/cli/inicio/vercurso/detallepago',{comision:this.comision,costo:costo,moneda:this.datos.tipomoneda,curso:this.datos.titulo}])
  }

  verinstructor(id){
    this.routes.navigate(['/cli/inicio/vercurso/verinstructor'],id)
  }

}
