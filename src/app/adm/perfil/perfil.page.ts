import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from 'src/app/services/usuario/usuario';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  datos = []
  genero = "hombre"
  verdatos = true
  id
  constructor(
    private router: Router,
    private storage: Storage,
    private user: UsuarioProvider,
    public alertController: AlertController,

  ) {

  }

  ngOnInit() {
    console.log("Perfil Page");
    this.storage.get("idusuario")
      .then(id => {
        console.log(id)
        this.id = id
        this.cargardatos(id)
      })

  }
  modperfil() {
    this.router.navigate(["/adm/perfil/mod-perfil", this.datos[0]])
  }
  cargardatos(id) {
    this.user.verUsuarioIDdbalumno(id)
      .then(datos => {
        console.log(datos[0])
        this.genero = datos[0].genero != 'h' ? 'Mujer' : 'Hombre'

        this.datos = datos
      })
      .catch(err => console.log(err))
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Desea cerrar sesion de GoodMe</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            this.storage.clear()
              .then(() => this.router.navigate(["/"]))
          }
        }
      ]
    });

    await alert.present();
  }
  changeAlumno(){
    this.storage.set('rol', "alumno")
    .then(()=>{
      return this.storage.get('rol')
    })
    .then(rol=>{
      console.log("rol before change:"+rol)
      this.router.navigate(['/cli'])
      }) 
  }
}
