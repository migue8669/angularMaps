import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PetModel } from './pet-model/pet.model';
import { map, catchError } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  baseUrl:string;

  constructor(private http:HttpClient) {
    this.baseUrl='https://node-c1ffb.firebaseio.com/'
   }
   getAll(){
     return this.http.get(`${this.baseUrl}node-c1ffb.json`).pipe(map(this.crearArreglo));
   }
   crearReporte(pet:PetModel){
     return this.http.post(` ${this.baseUrl}node-c1ffb.json`,pet).pipe(map((resp:any)=>{
       pet.$key=resp.name;
       return pet;
    }));;
   }
   private crearArreglo(petsObj:object){
     
   const heroes:PetModel[]=[];
   
   Object.keys(petsObj).forEach(key=>{
     console.log(key);
     console.log(petsObj);
     const pet: PetModel = petsObj;
pet.$key=key;
heroes.push(pet);
   })
   console.log(heroes);
    return heroes;
   }

}
