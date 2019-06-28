import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { CursoService } from 'src/app/services/curso/curso.service';

@Component({
  selector: 'app-vercurso',
  templateUrl: './vercurso.page.html',
  styleUrls: ['./vercurso.page.scss'],
})
export class VercursoPage implements OnInit {

  datos
  comision
  constructor(private routes:Router,
    private storage:Storage,
    private curso: CursoService

    ) { 
    this.datos=this.routes.getCurrentNavigation().extras
    console.log(this.datos);
    
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
    this.comision= (costo*0.1)
    this.routes.navigate(['/cli/inicio/vercurso/detallepago',{comision:this.comision,costo:costo,moneda:this.datos.tipomoneda,curso:this.datos.titulo}])
  }

  verinstructor(id){
    this.routes.navigate(['/cli/inicio/vercurso/verinstructor'],id)
  }
  inscribirme(){
    this.storage.get('idusuario')
    .then(id=>{
      return this.curso.crearUsu_cur(id,this.datos.idcursos,'i')
    })
    .then(()=>{
      console.log('se asigno correctamente el alumno al curso');
      
    })
    .catch(err=>{
      console.log(err);
      
    })
  }
}
