import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso/curso.service';
import { UsuarioProvider } from 'src/app/services/usuario/usuario';

@Component({
  selector: 'app-selecthorario',
  templateUrl: './selecthorario.page.html',
  styleUrls: ['./selecthorario.page.scss'],
})
export class SelecthorarioPage implements OnInit {
  id
  dias = ["DOMINGO", 'LUNES', "MARTES", 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO']
  horario = []
  seleccionados=[]
  constructor(private routes:Router,
    private servicioCurso:CursoService,
    private servicioUsuario:UsuarioProvider) {
    this.id=this.routes.getCurrentNavigation().extras
    console.log("id"+ this.id);

   }

  ngOnInit() {

    this.recuperarhorario(this.id)
  }

    //GUARDAR HOARIOS SELECCIONADOS
    horariosseleccionados(){
      
      
     console.log(this.horario);
     
    }

    //FUNCION QUE RECUPERA LOS HORARIOS
    recuperarhorario(id) {
      console.log("entro funcion" + id);
      this.servicioUsuario.mishorarios(id).then(data => {
        console.log(data);
        if (data.length != 0) {
          for (let i in this.dias) {
            this.horario.push({
              nombre: i,
              selec:"",
              horas: []
            })
            for (let j in data) {
              if (data[j].dia == i) {
                this.horario[i].horas.push(
                  {
                    id:data[j].idhorarios,
                    cantidad: data[j].contador,
                    inicio: data[j].hora_ini,
                    fin: data[j].hora_fin,
                    estado:1
                  })
              }
            }
          }
        } else {
          for (let i in this.dias) {
            this.horario.push({
              nombre: i,
              horas: []
            })
          }
        }
        console.log(this.horario);
      })
    }

}
