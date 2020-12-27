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
    this.baseUrl='https://maps-e7e33-default-rtdb.firebaseio.com/'
   }
   getAll(){
    // return this.http.get<any[]>(this.baseUrl).toPromise();
      return this.http.get(`${this.baseUrl}reporte.json`).pipe(map(this.crearArreglo));
   }
   crearReporte(pet:PetModel){
     console.log(pet)
     return this.http.post(`${this.baseUrl}reporte.json`,pet);
    //  .pipe(map((resp:any)=>{
    //    console.log(resp);
    //    pet.$key=resp.name;
    //    return pet;
    // }));
   }
   private crearArreglo(petsObj:object){
     
   const heroes:PetModel[]=[];
   if(petsObj===null){return [];}
   Object.keys(petsObj).forEach(key=>{
     console.log(key);
     console.log(petsObj);
     const pet:any=petsObj[key];
pet.$key=key;
heroes.push(pet);
   })
   console.log(heroes);
    return heroes;
   }

}
