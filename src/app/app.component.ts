import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FirebaseService } from './firebase.service';
import { PetModel } from './pet-model/pet.model';

import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  arraySegundoReporte:any[]=[];
  valorReporte:any;
 petActualizacion:PetModel=new PetModel()
  v:any;
  segundoReporteView:any;
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

     this.lat= position.coords.latitude;
     this.lng= position.coords.longitude;

      this.mascotass.forEach(r=>{console.log(this.pets.lat=r.lat)})
      console.log(this.lat)
      this.mascotass.forEach(r=>{console.log(this.pets.long=r.long)})

      console.log(this.lng)
      if(this.pets.lat == this.lat && this.pets.long==this.lng ){
        console.log(this.pets.lat);

        this.pets.lat = position.coords.latitude+0.000010;
        console.log(this.pets.lat);

        this.pets.long = position.coords.longitude+0.000010;
        this.pets.foto = this.URLPublica;
        console.log(this.pets);

      }else{
      this.pets.lat = position.coords.latitude;
      this.pets.long = position.coords.longitude;
      this.pets.foto = this.URLPublica;
      console.log(this.pets);
      }
      this.petService.crearReporte(this.pets).subscribe((respuesta) => {
        console.log(respuesta);
        this.pets = respuesta;
      });

      this.zoom = 17;
      this.located = true;
    });
  }
  async openDialog(key:PetModel){
    this.valorReporte=key;
    console.log(this.valorReporte)
this.v=  this.petService.getPet(this.valorReporte).subscribe(
      resp=>{this.petActualizacion=resp
      }

      );
    
  }

  async openDialogo(segundoReporte:PetModel){
    this.segundoReporteView=segundoReporte;
    console.log(this.segundoReporteView)

    
  }
  segundoReporte(){
    
if(this.petActualizacion.segundoReporte){
  console.log(this.petActualizacion.segundoReporte,this.pets.segundoReporte)
  this.arraySegundoReporte.push(this.petActualizacion.segundoReporte,this.pets.segundoReporte);

  console.log(this.arraySegundoReporte.toString())
  this.petActualizacion.segundoReporte=this.arraySegundoReporte.toString()
  // this.arraySegundoReporte.forEach(i=>{this.petActualizacion.segundoReporte=i})
  // console.log(this.petActualizacion.segundoReporte)
}else{
//  this.petService.getPet(this.valorReporte).subscribe(
//    resp=>{this.petActualizacion=resp});
// console.log(this.petActualizacion)
this.petActualizacion.$key=this.valorReporte;
this.petActualizacion.segundoReporte=this.pets.segundoReporte
     console.log(this.petActualizacion)
    // this.pets.$key=this.valorReporte;

}this.petService.actualizarReporte(this.valorReporte,this.petActualizacion).subscribe((respuesta)=>{
  console.log(respuesta) 
});}

  initMap() {
    this.petService.getAll().subscribe((pets) => {
      console.log(pets);
      this.mascotass = pets;
      console.log(this.mascotass);
    });

    
  }



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
