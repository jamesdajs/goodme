import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from 'src/app/services/usuario/usuario';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {

  datos = []
  genero = "Hombre"
  verdatos = true
  id
  constructor(
    private routes: Router, 
    private storage: Storage,
    private user:UsuarioProvider) { }

  ngOnInit() {
    console.log("Perfil Page");
    this.storage.get("idusuario")
      .then(id => {
        console.log('id usu '+id)
        this.id = id
        this.cargardatos(id)
      })
  }
  

  changeInstructor() {

    this.storage.set('rol', "instructor")
      .then(() => {
        return this.storage.get('rol')
      })
      .then(rol => {
        console.log("rol before change:" + rol)
        this.routes.navigate(['/adm'])
      })
  }

  cargardatos(id) {
    this.user.verUsuarioIDdbalumno(id)
      .then(datos => {
        console.log('datos usuario '+datos[0])
        this.genero = datos[0].genero != 'h' ? 'Mujer' : 'Hombre'
        this.datos = datos[0]
      })
      .catch(err => console.log(err))
  }

}
