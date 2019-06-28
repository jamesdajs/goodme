import { Component, OnInit , ViewChild} from '@angular/core';
import { IonSegment, IonSlides ,ToastController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumnosdetalle',
  templateUrl: './alumnosdetalle.page.html',
  styleUrls: ['./alumnosdetalle.page.scss'],
})
export class AlumnosdetallePage implements OnInit {

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
      title: "Third Slide"
    }
  ];
  datos
  constructor(public toastCtrl:ToastController,
    private router :Router
    ) {
      this.datos=this.router.getCurrentNavigation().extras
      console.log(this.datos);
      
    }
   //----------------funciones tab slide------------------
   onSegmentChanged(segmentButton) {
    this.select=segmentButton.detail.value;
     const selectedIndex = this.slides.findIndex((slide) => {
       return slide.id === segmentButton.detail.value;
     });
     this.slider.slideTo(selectedIndex);
   }
 
   onSlideChanged(event) {
    
    this.slider.getActiveIndex()
    .then(num=>{
      this.selectedSegment=this.slides[num].id
    })
    
  }
   //--------------end funciones tab slide--------------*/

  ngOnInit() {
  }

  //-------------funcion para mostrar toast ----------
  estadoToast=true;
  async presentToastWithOptions(){
    const toast = await this.toastCtrl.create({
      message: 'En esta sección podrás asignar rutinas y dietas para',
      showCloseButton: true,
      closeButtonText: 'Ok',
      animated:true,
    });
    if(this.estadoToast){
      toast.present()
      this.estadoToast=false
    } 

    const dismiss = await toast.onDidDismiss();
    if(dismiss.role === 'cancel') {
      this.estadoToast=true;
    }
   }
   //-------------END FUNCTION TOAST--------------
   //--------------FUNCION PARA SUB ITEM-------------
   showSubmenu: boolean = false;

   menuItemHandler(): void {
     this.showSubmenu = !this.showSubmenu;
   }
}
