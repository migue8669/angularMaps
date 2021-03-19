import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PetModel } from './models/pet.model';
import { map, catchError } from 'rxjs/operators';
//import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import{Observable } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { SegundoReporte } from './models/segundoReporte.model';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
// petsCollection?: AngularFirestoreCollection<PetModel>;
petsFotos?:Observable<PetModel>;

  baseUrl:string;

  constructor(private http:HttpClient,   private storage: AngularFireStorage) {
    
//   this.baseUrl='https://maps-e7e33-default-rtdb.firebaseio.com/'
   this.baseUrl='https://mytodolist-28b77.firebaseio.com/'
   }
   getAll(){
    // return this.http.get<any[]>(this.baseUrl).toPromise();
      return this.http.get(`${this.baseUrl}reporte.json`).pipe(map(this.crearArreglo));
   }
   getPet(id:string){
     return this.http.get( `${this.baseUrl}reporte/${id}.json`);
   }
   getReporteAll(id:string){
    return this.http.get(`${this.baseUrl}reporte/${id}/segundoReporte.json`).pipe(map(this.crearArregloReporte));
  }
   public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }
  
 //Referencia del archivo
 public referenciaCloudStorage(nombreArchivo: any) {
console.log("referenciaCloud")
  return this.storage.ref(nombreArchivo);
}

// subirArchivo(nombreDelArchivo: string, datos: any): AngularFireUploadTask {
//   return this.storage.upload("fotos/"  + nombreDelArchivo, datos);
//   }
//   referenciaDelArchivo(nombreArchivo: string): AngularFireStorageReference {
//   return this.storage.ref("fotos/"   + nombreArchivo);
//   }
   crearReporte(pet:PetModel){
    //  console.log(pet)
    //  JSON.stringify(pet);
    //  console.log(pet)

     return this.http.post(`${this.baseUrl}reporte.json`,pet)
     .pipe(map((resp:any)=>{
       console.log(resp);
       pet.$key=resp.name;
       return pet;
    })
    );
   }
   actualizarReporte(id:any,pet:any){
      console.log(pet)

      console.log(id)
      //  JSON.stringify(pet);
    //  console.log(pet)
   const petTemporal={
     ...pet
   }

   delete(petTemporal.$key);
   console.log(id)
   console.log(petTemporal)

     return this.http.put(`${this.baseUrl}reporte/${id}.json`,petTemporal) ;
    
    
   }

   actualizarReporteConModelo(id:any,reporte:SegundoReporte){
    console.log(reporte)

    console.log(id)
    //  JSON.stringify(pet);
  //  console.log(pet)
//  const petTemporal={
//    ...pet
//  }

//  delete(petTemporal.$key);
 console.log(reporte)
//  console.log(petTemporal)

   return this.http.put(`${this.baseUrl}reporte/${id}/segundoReporte/${reporte.id}.json`,reporte) ;
  
  
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
   private crearArregloReporte(petsObj:object){
    const heroes:SegundoReporte[]=[];
    if(petsObj===null){return [];}
    Object.keys(petsObj).forEach(key=>{
      console.log(key);
      console.log(petsObj);
      const pet:any=petsObj[key];
      pet.$key=key;
 pet.$key=key;
 heroes.push(pet);
    })
    console.log(heroes);
     return heroes;
    }
}
