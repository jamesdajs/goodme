import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit{

  constructor(private routes:Router,private storage:Storage) { }

  ngOnInit() {
  }

  changeInstructor(){

    this.storage.set('rol', "instructor")
    .then(()=>{
      return this.storage.get('rol')
    })
    .then(rol=>{
      console.log("rol before change:"+rol)
      this.routes.navigate(['/adm'])
      })
  }
  
}
