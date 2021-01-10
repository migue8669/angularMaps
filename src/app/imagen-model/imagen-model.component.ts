import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentService } from '../component.service';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-imagen-model',
  templateUrl: './imagen-model.component.html',
  styleUrls: ['./imagen-model.component.css']
})
export class ImagenModelComponent implements OnInit {
  datosFormulario = new FormData();
  mensajeArchivo = 'No hay un archivo seleccionado';
  nombreArchivo = '';
  porcentaje = 0;
   selectedImage: any = null;
  finalizado = false;
  URLPublica = '';
  @Output()
url:EventEmitter<string>=new EventEmitter<string>();

  constructor(private petService:FirebaseService,private componentS:ComponentService) { }
  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });
  ngOnInit(): void {
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
      this.url.emit(this.selectedImage)
    });

  }
}
