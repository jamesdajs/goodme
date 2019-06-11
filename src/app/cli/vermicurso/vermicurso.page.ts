import { Component, OnInit,ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-vermicurso',
  templateUrl: './vermicurso.page.html',
  styleUrls: ['./vermicurso.page.scss'],
})
export class VermicursoPage implements OnInit {

  @ViewChild('mySlider') slider: IonSlides;
  selectedSegment='first';
  select="";
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
  constructor() { }

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
  }

}
