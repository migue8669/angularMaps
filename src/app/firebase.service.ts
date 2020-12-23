import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PetModel } from './pet-model/pet.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  baseUrl:string;

  constructor(private http:HttpClient) {
    this.baseUrl='https://nodejs-ea572.firebaseio.com'
   }
   getAll(){
     return this.http.get(`${this.baseUrl}/nodejs-ea572.json`).pipe();
   }
   crearReporte(pet:PetModel){
     return this.http.post(` ${this.baseUrl}/nodejs-ea572.json`,pet);
   }
   private crearArreglo(petsObj:object){
   const heroes:PetModel[]=[];
   console.log(petsObj);
    return "hola";
   }

}
