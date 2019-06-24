import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

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

  constructor(private http:HttpClient) { }

     //tipo ejercicios
     crearcurso(datos,fecha,hora,semanas):Promise<void>{
      let sql="INSERT into cursos (titulo,descripcion,costo,tipomoneda,fecha,hora,semanas) VALUES (?,?,?,?,?,?,?)"
      let values=[datos.titulo,datos.descripcion,datos.costo,datos.moneda,fecha,hora,semanas]
      return this.http.post<any>(this.urlInsert,{sql:sql,values:values},{headers:this.headers})
      .toPromise()
    }

    //listar cursos
    listarcursos(estado){
      let sql="select c.*,u.idusuarios, u.fullname, u.foto, u.telefono from cursos c,usu_cur uc,usuarios u where c.estado=? and u.idusuarios=uc.id_usuario and uc.id_curso=c.idcursos and uc.tipo=0"
      let values=[estado]
      return this.http.post<[]>(this.urlSelect,{sql:sql,values:values},{headers:this.headers})
    }

      //listar cursos
    miscursospublicados(estado,idusu){
      let sql="select c.*,u.idusuarios, u.fullname, u.foto, u.telefono from cursos c,usu_cur uc,usuarios u where c.estado=? and uc.id_usuario=? and u.idusuarios=uc.id_usuario and uc.id_curso=c.idcursos and uc.tipo=0"
      let values=[estado,idusu]
      return this.http.post<[]>(this.urlSelect,{sql:sql,values:values},{headers:this.headers})
    }

    //listar cursos
    buscarCurso(query){
      let sql="select c.*,u.idusuarios, u.fullname, u.foto, u.telefono from cursos c,usu_cur uc,usuarios u where  u.idusuarios=uc.id_usuario and uc.id_curso=c.idcursos and uc.tipo=0 and c.idcursos IN(SELECT cc.idcursos FROM cursos cc WHERE cc.estado=1  cc.titulo like '%?%' OR cc.descripcion like '%?%')"
      let values=[query]
      return this.http.post<[]>(this.urlSelect,{sql:sql,values:values},{headers:this.headers})
    }
}
