import { Component, OnInit , ViewChild} from '@angular/core';
import { IonSlides,ActionSheetController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-miscursos',
  templateUrl: './miscursos.page.html',
  styleUrls: ['./miscursos.page.scss'],
})
export class MiscursosPage implements OnInit {

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
    }
  ];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl:ToastController,
    private routes:Router
  ) { }

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

  ngOnInit() {
  }

  //----------FUNCION DESLIZAR OPCIONES---------------
  opciones(){
    this.actionSheetCtrl.create({
      buttons:[
        {
          text: 'Compartir',
          icon: 'md-share',
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Modificar',
          icon: 'create',
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Eliminar',
          icon:'trash',
          handler: () => {
            console.log('Archive clicked');
            //this.eliminarpubli(p)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).then(actionsheet => {
      actionsheet.present();
    });
  }

   //-------------funcion para mostrar toast ----------
   estadoToast=true;
   async presentToastWithOptions(){
     const toast = await this.toastCtrl.create({
       message: 'Esta seccion visualizará todos tus cursos publicados',
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

    //-------------------FUNCION CREAR CURSO------------
    crearcurso(){
      this.routes.navigate(['/adm/cursos/crearcurso'])
    }
}
