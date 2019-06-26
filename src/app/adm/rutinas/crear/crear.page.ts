import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController, NavController } from '@ionic/angular';
import { ModaladdejerPage } from '../modaladdejer/modaladdejer.page';
import { Storage } from '@ionic/storage';
import { RutinaProvider } from 'src/app/services/rutina/rutina';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  myForm: FormGroup
  ejercicios = []
  constructor(
    private formb: FormBuilder,
    public modalController: ModalController,
    public storage:Storage,
    public rutina:RutinaProvider,
    public toastController: ToastController,
    public navCtrl:NavController,
  ) {
    this.myForm = this.formb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  ngOnInit() {
  }
  async addEjercicio() {
    const modal = await this.modalController.create({
      component: ModaladdejerPage,
      componentProps: { ejerselec:this.ejercicios }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss()
    console.log(data);
    this.ejercicios=data

  }
  eliminar(i){
    this.ejercicios.splice(i, 1);
  }
  guardar(){
    if(this.myForm.invalid || this.ejercicios.length==0)
      this.presentToast('Tienen que llenar todos los campos y seleccionar al menos un ejercicio')
    else{
      let _idusu, _idrut
      this.storage.get('idusuario')
      .then(idusu=>{
        _idusu = idusu
        return this.rutina.crearRutinaDefecto(_idusu,this.myForm.value)
      })
      .then(res=>{
        let func = []
        console.log(res)
        _idrut=res
        for(let i in this.ejercicios)
          func.push(this.rutina.crearRutina_Ejer(res,this.ejercicios[i].idejercicios))
        return Promise.all(func)
      })
      .then(()=>this.rutina.listaridejerrut(_idrut))
      .then(array=>{
        console.log(array);
        let func=[]
        array.forEach(item=>{
          this.ejercicios.forEach(ejer=>{
            if(item.id_ejercicio==ejer.idejercicios){
              ejer.sets.forEach(sets=>{
                func.push(this.rutina.crearSetRutina_Ejer(item.idrut_ejer,sets))
              })
            }
          })
        })
        return Promise.all(func)
        //id_ejercicio,idrut_ejer
      })
      .then(()=>{
        this.presentToast('Se guardo corectamente la rutina')
        this.navCtrl.back()
      })
      .catch(err=>{
        console.log(err);
        
        this.presentToast('No se puedo guardar la rutina correctamente')
        this.navCtrl.back()
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
  
}
