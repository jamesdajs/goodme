import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/services/curso/curso.service';
import { UsuarioProvider } from 'src/app/services/usuario/usuario';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-selecthorario',
  templateUrl: './selecthorario.page.html',
  styleUrls: ['./selecthorario.page.scss'],
})
export class SelecthorarioPage implements OnInit {
  idcurso
  idusu
  idalumno
  dias = ["DOMINGO", 'LUNES', "MARTES", 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO']
  horario = []
  seleccionados=[]
  constructor(private routes:Router,
    private servicioCurso:CursoService,
    private servicioUsuario:UsuarioProvider,
    public alertController: AlertController,
    private route:ActivatedRoute,
    private storage:Storage) {
    //this.id=this.routes.getCurrentNavigation().extras
    this.idcurso = this.route.snapshot.paramMap.get('idc')
    this.idusu = this.route.snapshot.paramMap.get('idu')
    console.log("id"+ this.idcurso);
    this.recuperarhorario(this.idusu)
    this.storage.get("idusuario")
      .then(id => {
        console.log(id)
        this.idalumno = id
        
      })
   }

  ngOnInit() {
  }

    //GUARDAR HOARIOS SELECCIONADOS
    horariosseleccionados(){
      this.servicioCurso.crearUsu_cur(this.idalumno,this.idcurso,"i").then(resp=>{
        for(let i in this.horario){
          if(this.horario[i].selec){
            this.servicioCurso.guardar_registro_horario(this.horario[i].selec,resp).then(resp=>{
              console.log("guardo");
            })
          }else{
            console.log("no guardo");
            
          }
        }
      })
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

    async presentAlertConfirm() {
      const alert = await this.alertController.create({
        header: 'Horarios seleccionados!!',
        message: 'Se guardaran tus horarios seleccionados',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Guardar',
            handler: () => {
              this.horariosseleccionados()
              console.log('Confirm Okay');
            }
          }
        ]
      });
    
      await alert.present();
    }

}
