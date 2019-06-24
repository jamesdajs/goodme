import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FotosService } from 'src/app/services/fotos.service';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso/curso.service';

@Component({
  selector: 'app-crearcurso',
  templateUrl: './crearcurso.page.html',
  styleUrls: ['./crearcurso.page.scss'],
})
export class CrearcursoPage implements OnInit {
  myFormins: FormGroup
  imagenes=[]
  duracion
  fecha
  horas
  semanas
  datos={
    descripcion:"",
    titulo:"",
    costo:0,
    moneda:""
  }
  jsonData: any;
  
  constructor(
    private fotos:FotosService,
    private selector:WheelSelector ,
    public formb: FormBuilder,
    public loadingController: LoadingController,
    private router:Router,
    private toastController:ToastController,
    private curso:CursoService
   ) { 
    this.jsonData = {
      horas: [
        { description: "1" },
        { description: "2" },
        { description: "3" },
        { description: "4" },
        { description: "5" },
        { description: "6" },
        { description: "7" }
      ],
      semanas: [
        { description: "1" },
        { description: "2" },
        { description: "3" },
        { description: "4" },
        { description: "5" },
        { description: "6" },
        { description: "7" },
        { description: "8" },
        { description: "9" },
        { description: "10" }
      ]
    };
      this.myFormins = this.formb.group({
        descripcion: ['', [Validators.required]],
        titulo: ['', [Validators.required]],
        costo: ['', [Validators.required]],
        moneda: ['', [Validators.required]],
      });
    }
 
  ngOnInit() {
  }
  
  //cuncion para seleccionar imagen
  selecImage(){
    this.fotos.escogerImagenes(5).then(images=>{
      this.imagenes==images;
    });
  }

  selectDuracion() {
    this.selector.show({
      title: "Selecciona duración del curso",
      items: [
        this.jsonData.horas, this.jsonData.semanas
      ],
      positiveButtonText: "Ok",
      negativeButtonText: "Cancelar",
      defaultItems: [
        {index:0, value: this.jsonData.horas[0].description},
        {index: 1, value: this.jsonData.semanas[0].description}
      ]
    }).then(
      result => {
        console.log("resultado :"+result[0].description + ' ' + result[1].description);
        this.duracion=result[0].description + ' ' + result[1].description;
        this.horas=result[0].description 
        this.semanas=result[1].description;
      },
      err => console.log('Error: ' + JSON.stringify(err))
      );
  }

  //llenar datos en tabla relacion
  guardardatosTablaRelacion(){
    
  }


  date=new Date();
  guardarDatos(){
    console.log(this.myFormins.value);
    if (this.myFormins.valid) {
      let loading = this.presentLoading('Guardando datos')
      this.date=new Date('yyyy-MM-dd HH:mm:ss Z')
			Promise.all([
				this.curso.crearcurso(this.myFormins.value,this.date,5,9)
			])
				.then(res => {
					console.log('ddato devuelto '+res);
					loading.then(load => load.dismiss())

					this.router.navigate(['/adm/cursos'])

				})
				.catch(err => {
					console.log(err);
					loading.then(load => load.dismiss())
				})
		}
		else this.presentToast("Completa los campos")
  }

  //recupera el ultimo id
  recuperarId(){

  }

  //mesage loading
  async presentLoading(text) {
		const loading = await this.loadingController.create({
			message: text,
		});
		await loading.present()
		return loading
  }
  //funcion toast cargando
  async presentToast(text) {
		const toast = await this.toastController.create({
			message: text,
			duration: 2000
		});
		toast.present();
	}

}
