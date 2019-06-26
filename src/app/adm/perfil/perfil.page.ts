import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from 'src/app/services/usuario/usuario';
import { AlertController, NavController } from '@ionic/angular';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { AuthFacebookProvider } from 'src/app/services/authfacebok/authfacebok';


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
    private storage: Storage,
    private user: UsuarioProvider,
    public alertController: AlertController,
    private navCtrl:NavController,
    private selector:WheelSelector,
    private logfb:AuthFacebookProvider

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
    this.navCtrl.navigateForward(["/adm/perfil/mod-perfil", this.datos[0]])
  }
  cargardatos(id) {
    this.user.verUsuarioIDdbinstructor(id)
      .then(datos => {
        console.log(datos[0])
        this.genero = datos[0].genero == 'm' ? 'Mujer' : 'Hombre'

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
              .then(() => {
                this.logfb.logout()
                this.navCtrl.navigateRoot(["/"])
              })
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
      this.navCtrl.navigateRoot(['/cli/miperfil'])
      }) 
  }
  jsonData = {
    numbers: [
     { description: "1" },
      { description: "2" },
      { description: "3" }
    ],
    fruits: [
      { description: "Apple" },
      { description: "Banana" },
      { description: "Tangerine" }
    ],
    firstNames: [
      { name: "Fred", id: '1' },
      { name: "Jane", id: '2' },
      { name: "Bob", id: '3' },
      { name: "Earl", id: '4' },
      { name: "Eunice", id: '5' }
    ],
    lastNames: [
      { name: "Johnson", id: '100' },
      { name: "Doe", id: '101' },
      { name: "Kinishiwa", id: '102' },
      { name: "Gordon", id: '103' },
      { name: "Smith", id: '104' }
    ]
  }
  
  
  // basic number selection, index is always returned in the result
   selectANumber() {
     this.selector.show({
       title: "How Many?",
       items: [
         this.jsonData.numbers
       ],
     }).then(
       result => {
         console.log(result[0].description + ' at index: ' + result[0].index);
       },
       err => console.log('Error: ', err)
       );
   }
}
