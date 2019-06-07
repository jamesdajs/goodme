//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';

import {AngularFireAuth} from '@angular/fire/auth';
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
/*
  Generated class for the RutinaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({ providedIn: 'root' })
export class RutinaProvider {

  constructor(private db: AngularFirestore,
    private auth:AngularFireAuth,
    private http:HttpClient
    ) {
    console.log('Hello RutinaProvider Provider');
  }
  /*
  private getcollArrayconkey(coll,query?):Observable<any>{
    return this.db.collection(coll,query)
    .snapshotChanges().pipe(map(change=>{
      return change.map(c=>({key:c.payload.doc.id, ...c.payload.doc.data()}))
    }))
  }
  private  getcollitem(coll,key):Observable<any>{
    return this.db.collection(coll).doc(key)
    .valueChanges()
  }
  private  getcollitemquery(coll,query?):Observable<any>{
    return this.db.collection(coll,query)
    .valueChanges()
  }
  //ejercicios
  crearEjercicio(data){
    data["idinstructor"]=this.auth.auth.currentUser.uid
    return this.db.collection("ejercicios").add(data)
  }
  añadirfotoEjercicio(id,data){
    return this.db.collection("ejercicios").doc(id).set(data,{ merge: true })
  }
  eliminarEjercicio(id){
    return this.db.collection("ejercicios").doc(id).delete()
  }
  modificarEjercicio(id,data){
    return this.db.collection("ejercicios").doc(id).set(data,{ merge: true })
  }
  modificarEjercicioRutina_ejer(idejer,data){
    return this.db.collection("rutina_ejer").doc(idejer).set(data,{ merge: true })
  }
  listaRutinas_ejer(keyejer){
    let query=res=>res.where("idejercicio","==",keyejer)
    return this.getcollArrayconkey("rutina_ejer",query)
  }
  //rutinas
  verRutinas(keyins){
    let query=res => res.where("estado", "==", false).where("idinstructor","==",keyins)
    
    return this.getcollArrayconkey("cliente/"+this.auth.auth.currentUser.uid+"/rutinas",query)
  }
  verRutinasins(keyins){
    let query=res => res.where("estado", "==", false).where("idinstructor","==",this.auth.auth.currentUser.uid)
    
    return this.getcollArrayconkey("cliente/"+keyins+"/rutinas",query)
  }
  verEjercicios(keyrut){
    let query=res=>res.where("idrutina","==",keyrut)
    return this.getcollArrayconkey("rutina_ejer",query)
  }
  verMisEjercicios(tipo){
    let query=res=>res.where("idinstructor","==",this.auth.auth.currentUser.uid).where("tipo","==",tipo)
    return this.getcollArrayconkey("ejercicios",query)
  }
  verMisEjerciciostodo(){
    let query=res=>res.where("idinstructor","==",this.auth.auth.currentUser.uid)
    return this.getcollArrayconkey("ejercicios",query)
  }
  verDetalleEjercicios(keyejer){
    return this.getcollitem("ejercicios",keyejer)
  }
  verDetalleRutina_Ejer(keyejer,keyrut){
    let query=res=>res.where("idrutina","==",keyrut)
                      .where("idejercicio","==",keyejer)
    return this.getcollitemquery("rutina_ejer",query)
  }*/
  urlInsert="http://192.168.1.13/goodmeServe/public/usuarios"
  urlSelect="http://192.168.1.13/goodmeServe/public/usuarios/select"
  urlUpdate="http://192.168.1.13/goodmeServe/public/usuarios/modificar"
  urlDelete="http://192.168.1.13/goodmeServe/public/usuarios/eliminar"
  headers= new HttpHeaders({
    'Content-Type':  'application/json',
    'X-CSRF-TOKEN':"token",
    'Authorization':"token"
  })
    //tipo ejercicios
    crearTipoEjercicio(idusu,nombre):Promise<void>{
      let sql="INSERT into  tipo_ejercicios (idusuario,nombre) VALUES (?,?)"
      let values=[idusu,nombre]
      return this.http.post<any>(this.urlInsert,{sql:sql,values:values},{headers:this.headers})
      .toPromise()
    }
    modTipoEjercicio(nombre,id){
      let sql="update tipo_ejercicios set nombre = ? where idtipo_ejercicios = ?"
      let values=[nombre,id]
      return this.http.post(this.urlUpdate,{sql:sql,values:values},{headers:this.headers})
      .toPromise()
    }
    eliminarTipoEjercicio(idtipo){
      let sql="DELETE FROM tipo_ejercicios WHERE idtipo_ejercicios = ?"
      let values=[idtipo]
      return this.http.post(this.urlDelete,{sql:sql,values:values},{headers:this.headers})
      .toPromise()
    }
    listarTipoEjercicio(idusu){
      let sql="select * from tipo_ejercicios where idusuario=?"
      let values=[idusu]
      return this.http.post<[]>(this.urlSelect,{sql:sql,values:values},{headers:this.headers})
      .toPromise()
    }

    verUsuarioIDfb(idfb):Promise<any>{
      let sql="select * from usuarios where idfacebook=?"
      let values=[idfb]
      return this.http.post(this.urlSelect,{sql:sql,values:values},{headers:this.headers})
      .toPromise()
    }
    verUsuarioIDdb(id):Promise<any>{
      let sql="select * from usuarios where idusuarios=?"
      let values=[id]
      return this.http.post(this.urlSelect,{sql:sql,values:values},{headers:this.headers})
      .toPromise()
    }
}
