import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private routes:Router) { }

  ngOnInit() {
  }

  vercurso(){
    this.routes.navigate(['/cli/inicio/vercurso'])
  }
  


}
