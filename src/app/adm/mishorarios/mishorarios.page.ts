import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from 'src/app/services/usuario/usuario';
import { promise } from 'protractor';

@Component({
  selector: 'app-mishorarios',
  templateUrl: './mishorarios.page.html',
  styleUrls: ['./mishorarios.page.scss'],
})
export class MishorariosPage implements OnInit {
  dias = ["DOMINGO", 'LUNES', "MARTES", 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO']
  horario = []
  idusuario
  constructor(private storage:Storage,
    private servicioUsuario:UsuarioProvider) {
    this.storage.get('idusuario').then(id=>{
      this.idusuario=id
    })
    for (let i in this.dias) {
      this.horario.push({
        nombre: this.dias[i],
        horas: [
          {
            cantidad:1,
            inicio: "08:00",
            fin: '09:00'
          }
        ]
      })
      }
   }

  ngOnInit() {
  }

  aumentarhoras(_this) {

    _this.push({
      dias:this.dias,
      inicio: "08:00",
      fin: '09:00'
    })
  }
  quitarhoras(_this){
    _this.pop()
  }

  guardar(){
    let x=[]
    for(let i in this.dias){
      for(let h in this.horario[i].horas){
        console.log(this.idusuario,this.horario[i].horas[h].cantidad,this.horario[i].nombre,this.horario[i].horas[h].inicio,this.horario[i].horas[h].fin);
        x.push(this.servicioUsuario.guardarhorario(this.idusuario,this.horario[i].horas[h].cantidad,this.horario[i].nombre,this.horario[i].horas[h].inicio,this.horario[i].horas[h].fin))
      }
    }
    Promise.all(x).then(resp=>{
      console.log(resp);
    }).
    catch(er=>{
      console.log(er);
    })
  }

}
