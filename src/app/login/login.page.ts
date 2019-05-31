import { Component, OnInit } from '@angular/core';
import {  LoadingController } from '@ionic/angular';
//import { CrearusuarioPage} from '../crearusuario/crearusuario'

import { UsuarioProvider } from '../services/usuario/usuario';
import { AuthFacebookProvider } from '../services/authfacebok/authfacebok';

import { Storage } from '@ionic/storage';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage implements OnInit {

  estado=false
  constructor(
    private auth:AuthFacebookProvider,
    private user:UsuarioProvider,
    private splashscreen:SplashScreen,
    private store:Storage,
    private loadCtrl:LoadingController,
    private router:Router
    ) {
  }

  ngOnInit() {
    this.versiestalog()
  }
  versiestalog(){
    //this.splashscreen.show()
console.log("splas abierto")
    this.user.VerSiestaLogeado()
    .then(res=>{
      if(res){
        this.store.get("rol")
        .then(rol=>{
          if(rol=="alumno")this.router.navigateByUrl("")
          //adm
          else 
            this.router.navigate(['/adm/cursos', { hola: 'holamundo' } ])
          this.splashscreen.hide()
          
            console.log("splas cerado")
        })
        
      }
      
    })
  }
  iniciarSesion(){
    
  }
  async loginWithFacebook() {
    
    const cargar= await this.loadCtrl.create({
      message: "Cargando datos..."
      
    })
    await cargar.present()
    this.conectarFacebook()
    .then(res=>{
      //console.log(res)
      this.store.set("rol","alumno")
      //cli
      this.router.navigate(['/adm/cursos', { hola: 'holamundo' } ])
      cargar.dismiss()
    })
    .catch(err=>{
      console.log(err)
      cargar.dismiss()
    })
  }
  loginWithFacebook2() {
    this.auth.facebookauth()
      
  }
  conectarFacebook(){
    return new Promise((resolve,reject)=>{
      this.auth.loginWithFacebook().subscribe(data => {
        console.log(data)
        if (!this.estado) {
             this.user.verSitienenDatos()
             .then(datos=>{

                 if(datos===undefined){
                   this.auth.veriduser().then(idu=>{
                       let perfilFB=data.additionalUserInfo.profile
                       if(perfilFB.first_name===undefined)perfilFB.first_name=""
                       if(perfilFB.perfilFB.last_name===undefined)perfilFB.perfilFB.last_name=""
                       if(perfilFB.middle_name===undefined)perfilFB.middle_name=""
                       let datos={
                         nombres:perfilFB.first_name +' '+perfilFB.middle_name,
                         apellidos:perfilFB.last_name,
                         email:perfilFB.email,
                         foto:perfilFB.picture.data.url,
                         instructor:false,
                         descorta:"",
                         fullname:perfilFB.first_name +' '+perfilFB.middle_name+' '+perfilFB.last_name
                       }
                       this.user.crearusuario(idu,datos)
                       .then(()=>{
                         resolve('datos creados correctos')
                       })
                     })
                   }else resolve("ya se crearon datos antes")
                   
                 })
               
             }
      }, error=>{
        console.log(error);
        reject(error)
      });
    })
  }
}


