import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentService } from '../services/component.service';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-imagen-model',
  templateUrl: './imagen-model.component.html',
  styleUrls: ['./imagen-model.component.css']
})
export class ImagenModelComponent  {
  datosFormulario = new FormData();
  mensajeArchivo = 'No hay un archivo seleccionado';
  nombreArchivo = '';
  porcentaje = 0;
   selectedImage: any = null;
  finalizado = true;
  URLPublica = '';
  tarea:any;
  referencia:any;
  close= '';
  @Output()
url:EventEmitter<string>=new EventEmitter<string>();

  constructor(private petService:FirebaseService,private componentS:ComponentService) { }
  
  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });
  // ngOnInit(): void {
  // }

  async  cambioArchivo(event:any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        console.log(this.nombreArchivo)
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
    let archivo = this.datosFormulario.get('archivo');
      this.referencia = this.petService.referenciaCloudStorage(this.nombreArchivo);
     this.tarea = this.petService.tareaCloudStorage(this.nombreArchivo, archivo);
  }

  //Sube el archivo a Cloud Storage
  async subirArchivo() {
    console.log(this.referencia)
    console.log(this.tarea)

    //Cambia el porcentaje
    this.tarea.percentageChanges().subscribe((porcentaje:any) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = false;
        console.log(this.finalizado)
      }
    });
this.referencia.getDownloadURL().subscribe((URL: any) => {
      this.URLPublica = URL;
      this.selectedImage=URL;
      console.log(URL)
      this.url.emit(this.selectedImage)
    });

  }

}
