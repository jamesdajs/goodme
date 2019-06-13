import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crearcurso',
  templateUrl: './crearcurso.page.html',
  styleUrls: ['./crearcurso.page.scss'],
})
export class CrearcursoPage implements OnInit {
  myForm:FormGroup
  imgCropUrl=[]
  imgurlsaf
  dummyJson = {
    
    semanas:[
        { description: 'Horas', value: '' }
      ],
      horas:[
        { description: 'Semanas', value: '' }
      ]
    
  
  }
  constructor() { }
 
  ngOnInit() {
  }

}
