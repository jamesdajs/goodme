import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.page.html',
  styleUrls: ['./mycourses.page.scss'],
})
export class MycoursesPage implements OnInit {

  constructor(private routes:Router) { }

  ngOnInit() {
  }

  vermicurso(){
    this.routes.navigate(['/cli/mis-cursos/vermicurso'])
  }

}
