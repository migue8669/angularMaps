import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PetModel } from './models/pet.model';
import { map, catchError } from 'rxjs/operators';
//import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { SegundoReporte } from './models/segundoReporte.model';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  // petsCollection?: AngularFirestoreCollection<PetModel>;
  petsFotos?: Observable<PetModel>;

  baseUrl: string;

  constructor(private http: HttpClient, private storage: AngularFireStorage) {
    //   this.baseUrl='https://maps-e7e33-default-rtdb.firebaseio.com/'
    this.baseUrl = 'https://mytodolist-28b77.firebaseio.com/';
  }
  getAll() {
    // return this.http.get<any[]>(this.baseUrl).toPromise();
    return this.http
      .get(`${this.baseUrl}reporte.json`)
      .pipe(map(this.crearArreglo));
  }
  getPet(id: string) {
    return this.http.get(`${this.baseUrl}reporte/${id}.json`);
  }
  getReporteAll(id: string) {
    return this.http
      .get(`${this.baseUrl}reporte/${id}/segundoReporte.json`)
      .pipe(map(this.crearArregloReporte));
  }
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: any) {
    return this.storage.ref(nombreArchivo);
  }

  crearReporte(pet: PetModel) {
    return this.http.post(`${this.baseUrl}reporte.json`, pet).pipe(
      map((resp: any) => {
        pet.$key = resp.name;
        return pet;
      })
    );
  }
  actualizarReporte(id: any, pet: any) {
    const petTemporal = {
      ...pet,
    };

    delete petTemporal.$key;

    return this.http.put(`${this.baseUrl}reporte/${id}.json`, petTemporal);
  }

  actualizarReporteConModelo(id: any, reporte: SegundoReporte) {
    return this.http.put(
      `${this.baseUrl}reporte/${id}/segundoReporte/${reporte.id}.json`,
      reporte
    );
  }

  private crearArreglo(petsObj: any) {
    const heroes: PetModel[] = [];
    if (petsObj === null) {
      return [];
    }
    Object.keys(petsObj).forEach((key) => {
 
      const pet: PetModel = petsObj[key];
      pet.$key = key;
      heroes.push(pet);
    });
    return heroes;
  }
  private crearArregloReporte(petsObj: any) {
    const heroes: SegundoReporte[] = [];
    if (petsObj === null) {
      return [];
    }
    Object.keys(petsObj).forEach((key) => {

      const pet: SegundoReporte = petsObj[key];
      pet.id = key;
      pet.id = key;
      heroes.push(pet);
    });
    return heroes;
  }
}
