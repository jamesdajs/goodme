import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from 'src/app/services/usuario/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  datos={
    correo: "",
    fullname: "",
    foto:"",
    peso:null,
    altura:0,
    telefono:0,
    genero:null,
    fechanac:null
    
  }
  genero="hombre"
  verdatos=true
  id
  constructor(
    private router:Router,
    private storage:Storage,
    private user:UsuarioProvider
    
    ) {
      
     }

  ngOnInit() {
    console.log("Perfil Page");
    this.storage.get("idusuario")
      .then(id=>{
        console.log(id)
        this.id=id
        this.cargardatos(id)
      })
    
  }
  modperfil(){
    this.router.navigate(["/adm/perfil/mod-perfil",this.datos])
  }
  cargardatos(id){
    this.user.verUsuarioIDdbinstructor(id)
    .then(datos=>{
      console.log(datos[0])
      this.genero=datos[0].genero=='m'?'Mujer':'Hombre'
      this.datos=datos[0]
    })
    .catch(err=>console.log(err))
  }
}
