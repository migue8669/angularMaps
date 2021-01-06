import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { FirebaseService } from './firebase.service';
import { PetModel } from './pet-model/pet.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { fromEventPattern, Observable, pipe } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  [x: string]: any;
  opcion1 = false;
  opcion2 = false;
  lat: number;
  lng: number;
  zoom: number;
  mapTypeId: string;
  located: boolean;
  pets: PetModel = new PetModel();
  @Input() mascotass: PetModel[] = [];
  markers: PetModel[] = [];
  value: string;
  selectedImage: any = null;
  imgSrc: string = '';
  modal: boolean = true;
  porcentaje = 0;
  nombreArchivo = '';
  datosFormulario = new FormData();
  finalizado = false;
  mensajeArchivo = 'No hay un archivo seleccionado';
  URLPublica = '';
  src = '';

  constructor(
    private petService: FirebaseService,
    private route: ActivatedRoute
  ) {
    this.lat = 0;
    this.lng = 0;
    this.zoom = 5;
    this.mapTypeId = 'hybrid';
    this.located = false;
    this.value = '';
  }
  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });
  async ngOnInit() {
    // this.store.dispatch(new fromStore.LoadCustomer());



    this.petService.getAll().subscribe((pets) => {
      console.log(pets);
      this.mascotass = pets;
      console.log(this.mascotass);
    });

    //this.petService.getAll().then(pets=>{this.mascotas=pets}).catch(error=>console.log(error));
  }

  primerReporte() {
    navigator.geolocation.getCurrentPosition((position) => {
      if (this.opcion1) {
        this.pets.tipoReporte = 'perdida';
      }
      if (this.opcion2) {
        this.pets.tipoReporte = 'abandono';
      }
      
      this.pets.lat = position.coords.latitude;
      this.pets.long = position.coords.longitude;
      this.pets.foto = this.URLPublica;
      console.log(this.pets);

      this.petService.crearReporte(this.pets).subscribe((respuesta) => {
        console.log(respuesta);
        this.pets = respuesta;
      });

      this.zoom = 17;
      this.located = true;
    });
  }

  segundoReporte(reporte:any){
    console.log(reporte.$key)
    console.log(reporte)
this.petService.actualizarReporte(reporte).subscribe((respuesta)=>{
  console.log(respuesta);
})
  }

  initMap() {
    this.petService.getAll().subscribe((pets) => {
      console.log(pets);
      this.mascotass = pets;
      console.log(this.mascotass);
    });

    
  }

  // showPreview(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => (this.imgSrc = e.target.result);
  //     reader.readAsDataURL(event.target.files[0]);
  //     this.selectedImage = event.target.files[0];
  //     this.pets.foto = this.selectedImage;
  //     console.log(this.pets.foto);
  //   } else {
  //     this.imgSrc = './assets/image_placeholder.jpg';
  //     this.selectedImage = null;
  //   }
  // }

  // public guardar(event: any): void {
  //   this.modal = this.modal != this.modal;
  //   // this.modalService.dismissAll("exampleModal")

  //   for (let i = 0; i < event.target.files.length; i++) {
  //     var archivo = event.target.files[0];
  //   }

  //   this.porcentaje = 0;
  //   // const archivo = event.target.files[0];
  //   console.log(archivo);
  //   if (!archivo) {
  //     return;
  //   }
  //   const nombreDelArchivo = archivo.name; // Sustituir por un id
  //   const subida = this.petService.subirArchivo(nombreDelArchivo, archivo);
  //   subida
  //     .percentageChanges()
  //     .subscribe((porcentaje: any) => (this.porcentaje = porcentaje));
  //   subida.then((snapshot: any) => {
  //     const referencia = this.petService.referenciaDelArchivo(nombreDelArchivo);
  //     referencia.getDownloadURL().subscribe((URL: any) => (this.src = URL));
  //     console.log(referencia);
  //   });

  //   console.log(subida);
  //   console.log(event);
  // }

  public cambioArchivo(event:any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  //Sube el archivo a Cloud Storage
  public subirArchivo() {
    let archivo = this.datosFormulario.get('archivo');
    let referencia = this.petService.referenciaCloudStorage(this.nombreArchivo);
    let tarea = this.petService.tareaCloudStorage(this.nombreArchivo, archivo);

    //Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje:any) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;
      }
    });

    referencia.getDownloadURL().subscribe((URL: any) => {
      this.URLPublica = URL;
      this.selectedImage=URL;
      console.log(this.selectedImage)
    });
  }

}
