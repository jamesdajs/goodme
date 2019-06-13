import { Component, OnInit } from '@angular/core';
import { FotosService } from 'src/app/services/fotos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { RutinaProvider } from 'src/app/services/rutina/rutina';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  myForm: FormGroup
  imgCropUrl = []
  idtipo
  constructor(
    private fotos: FotosService,
    private formb: FormBuilder,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public rutina: RutinaProvider,
    public Aroute: ActivatedRoute,
    public navCtrl:NavController
  ) {
    this.myForm = this.formb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(100)]],
      instrucciones: ['', [Validators.required, Validators.maxLength(300)]],
      linkyoutube: ['']
    });
    this.idtipo = this.Aroute.snapshot.paramMap.get('idtipo_ejercicios')
  }

  ngOnInit() {
  }
  blobktombal
  seleccionarImagenes() {
    this.fotos.escogerImagenes(5)
      .then(urlarray => {
        this.imgCropUrl = urlarray
        return this.fotos.createThumbnail(urlarray[0].base64)
      })
      .then(data=>{
        this.blobktombal=data.blob
        //alert(JSON.stringify(data.size))
      })
      .catch(err => console.log(err))
  }
  guardar() {
    if (this.myForm.invalid) {
      this.presentToast('Tiene que llenar todos los datos')

    } else {
      let loadding = this.presentLoading('Guardando datos...')
      let _idejer=''
      this.rutina.crearEjercicio(this.idtipo, this.myForm.value)
        .then(()=> this.rutina.verUltimoIdEjercicio(this.idtipo))
        .then(idejer=>{
          _idejer=idejer[0].idejercicios
          let aux=[]
          for(let i in this.imgCropUrl)
            aux.push(this.fotos.subirimagen(this.imgCropUrl[i].blob,'ejercicios',i))
          return Promise.all(aux)
        })
        .then((array)=>{
          let aux=[]
          for(let i in array)
            aux.push(this.rutina.crearImagenEjercicio(_idejer,{nombre:array[i].name,url:array[i].dir+array[i].name}))
          return Promise.all(aux)
        })
        .then(()=>{
          if(this.blobktombal)
            return this.fotos.subirimagen(this.blobktombal,'ejercicios','5')
        })
        .then(res=>{
          if(res)
            return this.rutina.modThompbailEjercicio(_idejer,res.dir+res.name)})
        .then(()=> loadding)
        .then(load=>{
          load.dismiss()
          this.presentToast('Se creo un nuevo ejercicio')
          this.navCtrl.pop()
        })
        .catch(async err => {
          await loadding.then(load=>load.dismiss())
          this.presentToast('Ocurio un error al guardar el ejercicio')
          console.log(err)
        })

    }
  }
  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
  async presentLoading(text) {
    const loading = await this.loadingController.create({
      message: text
    });
    await loading.present();
    return loading
  }
}
