4//import { HttpClient } from '@angular/common/http';
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
  url='http://localhost/goodmeServe/public/'
  urlInsert=this.url+"usuarios"
  urlSelect=this.url+"usuarios/select"
  urlUpdate=this.url+"usuarios/modificar"
  urlDelete=this.url+"usuarios/eliminar"
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
    estadoTipoEjercicio(idtipo,estado){
      let sql="update tipo_ejercicios set estado = ? where idtipo_ejercicios = ?"
      let values=[estado,idtipo]
      return this.http.post(this.urlDelete,{sql:sql,values:values},{headers:this.headers})
      .toPromise()
    }
    listarTipoEjercicio(idusu){
      let sql="select * from tipo_ejercicios where idusuario=?"
      let values=[idusu]
      return this.http.post<[]>(this.urlSelect,{sql:sql,values:values},{headers:this.headers})
      .toPromise()
    }
    //ejercicicos
    verUltimoIdEjercicio(idtipoejer){
      let sql='SELECT idejercicios FROM `ejercicios` WHERE id_tipoejercicio=? ORDER BY idejercicios DESC LIMIT 1'
      let values=[idtipoejer]
      return this.http.post<any>(this.urlSelect,{sql:sql,values:values},{headers:this.headers})
      .toPromise()
    }
    crearEjercicio(idtipo,datos):Promise<void>{
      let sql="INSERT into  ejercicios (id_tipoejercicio,nombre,descripcion,instrucciones,linkyoutube) VALUES (?,?,?,?,?)"
      let values=[idtipo,datos.nombre,datos.descripcion,datos.instrucciones,datos.linkyoutube]
      return this.http.post<any>(this.urlInsert,{sql:sql,values:values},{headers:this.headers})
      .toPromise()
    }
    crearImagenEjercicio(idejer:string,datos:{nombre:string,url:string}):Promise<void>{
      let sql="INSERT into  fotos_ejercicios (nombre,url,id_ejercicio) VALUES (?,?,?)"
      let values=[datos.nombre,datos.url,idejer]
      return this.http.post<any>(this.urlInsert,{sql:sql,values:values},{headers:this.headers})
      .toPromise()
    }
    eliminarImagenEjercicio(idFotoejer){
      let sql="DELETE FROM fotos_ejercicios WHERE idfotos_ejercicios = ?"
      let values=[idFotoejer]
      return this.http.post(this.urlDelete,{sql:sql,values:values},{headers:this.headers})
      .toPromise()
    }
    estadoEjercicio(idtipo,estado){
      let sql="update ejercicios set estado = ? where idejercicios = ?"
      let values=[estado,idtipo]
      return this.http.post(this.urlDelete,{sql:sql,values:values},{headers:this.headers})
      .toPromise()
    }
    modificarEjercicio(idejer:string,datos){
      let sql="update ejercicios set nombre = ? ,descripcion=?,instrucciones=?,linkyoutube=? where idejercicios = ?"
      let values=[datos.nombre,datos.descripcion,datos.instrucciones,datos.linkyoutube,idejer]
      return this.http.post(this.urlUpdate,{sql:sql,values:values},{headers:this.headers})
      .toPromise()
    }
    modThompbailEjercicio(idejer:string,url:string){
      let sql="update ejercicios set miniatura = ? where idejercicios = ?"
      let values=[url,idejer]
      return this.http.post(this.urlUpdate,{sql:sql,values:values},{headers:this.headers})
      .toPromise()
    }
    eliminarEjercicio(idtipo){
      let sql="DELETE FROM tipo_ejercicios WHERE idtipo_ejercicios = ?"
      let values=[idtipo]
      return this.http.post(this.urlDelete,{sql:sql,values:values},{headers:this.headers})
      .toPromise()
    }
    listarEjercicio(idtipo,estado){
      let sql="select * from ejercicios where id_tipoejercicio=? and estado=?"
      let values=[idtipo,estado]
      return this.http.post<[]>(this.urlSelect,{sql:sql,values:values},{headers:this.headers})
    }
    listarImagenesEjercicios(idejer){
      let sql="select * from fotos_ejercicios where id_ejercicio=? "
      let values=[idejer]
      return this.http.post<[]>(this.urlSelect,{sql:sql,values:values},{headers:this.headers})
      .toPromise()
    }
    //ds


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
