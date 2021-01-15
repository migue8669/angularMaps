import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
url='https://identitytoolkit.googleapis.com/v1/accounts:'
private apiKey='AIzaSyDxt9Juen-d02GQG_dspB_7kZVb__J-gVY'
  userToken: string ='';
  constructor(private http : HttpClient) {
    this.leerToken();
  }

  logOut(usuario:UsuarioModel){

  }

  logIn(usuario:UsuarioModel){
    const authData={
      ...usuario,
      returnSecureToke:true
    }
    return this.http.post(`${this.url}signInWithPassword?key=${this.apiKey}`,authData).pipe(map(resp=>{
      this.guardarToken(resp["idtoken"]);
      return resp;
    }));
  }
  nuevoUsuario(usuario:UsuarioModel){
    const authData={
      email:usuario.email,
      password:usuario.password,
      returnSegureToken:true
    };
    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`,
      authData
    ).pipe(map(resp=>{
      this.guardarToken(resp["idtoken"]);
      return resp;
    }));
  }
  private guardarToken(idtoken:string){
    this.userToken=idtoken;
    localStorage.setItem('token',idtoken);

  }

  leerToken(){
    if(localStorage.getItem('token')){
this.userToken=(localStorage.getItem('token'));
    }else{
      this.userToken=''
    }
    return this.userToken;
  }
}
