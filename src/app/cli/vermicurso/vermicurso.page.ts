import { Component, OnInit,ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { RutinaProvider } from 'src/app/services/rutina/rutina';

@Component({
  selector: 'app-vermicurso',
  templateUrl: './vermicurso.page.html',
  styleUrls: ['./vermicurso.page.scss'],
})
export class VermicursoPage implements OnInit {

  @ViewChild('mySlider') slider: IonSlides;
  selectedSegment='first';
  select="";
  ejercicios = {}
  rutinas = []
  idusu
  slides = [
    {
      id: "first",
      title: "First Slide"
    },
    {
      id: "second",
      title: "Second Slide"
    },
    {
      id: "third",
      title: "Thrid Slide"
    }
  ];
  constructor(private router:Router,
    private rutina: RutinaProvider,) {
      this.idusu=this.router.getCurrentNavigation().extras
     }

   //----------------funciones tab slide------------------
   onSegmentChanged(segmentButton) {
    console.log("Segment changed to", segmentButton.detail.value);
    this.select=segmentButton.detail.value;
     const selectedIndex = this.slides.findIndex((slide) => {
       return slide.id === segmentButton.detail.value;
     });
     this.slider.slideTo(selectedIndex);
   }
 
   onSlideChanged(event) {
     console.log('Slide changed',this.select);
     this.selectedSegment = this.select;
   }
   //--------------end funciones tab slide--------------*/

   //--------------FUNCION PARA SUB ITEM-------------
   showSubmenu: boolean = false;

   menuItemHandler(): void {
     this.showSubmenu = !this.showSubmenu;
   }
  ngOnInit() {
    this.cargarRutinas()
  }
  cargarRutinas() {
    console.log(this.idusu);
    
    this.rutina.listarRutinas_cli(this.idusu, true)
      .then(array => {
        console.log(array);
        for (let i in array) {
          this.ejercicios[array[i].idrutinas] = []
          array[i]['estadohidden'] = false
          array[i]['ejercicios'] = []
        }
        this.rutinas = array
      })
  }
  verejercicio(){
    this.router.navigate(['/cli/mis-cursos/vermicurso/verejercicio'])
  }

}
