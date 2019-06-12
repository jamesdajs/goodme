import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vercurso',
  templateUrl: './vercurso.page.html',
  styleUrls: ['./vercurso.page.scss'],
})
export class VercursoPage implements OnInit {

  constructor(private routes:Router) { }
  showToolbar = false;
  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
    const scrollTop = $event.detail.scrollTop;
    this.showToolbar = scrollTop >= 225;
    }
    }

  ngOnInit() {
  }
  detallepago(){
    this.routes.navigate(['/cli/inicio/vercurso/detallepago'])
  }

  verinstructor(){
    this.routes.navigate(['/cli/inicio/vercurso/verinstructor'])
  }

}
