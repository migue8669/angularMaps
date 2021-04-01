import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { SegundoReporte } from '../models/segundoReporte.model';
import { PetModel } from '../models/pet.model';
import { UUID } from 'angular2-uuid';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-respuesta-model',
  templateUrl: './respuesta-model.component.html',
  styleUrls: ['./respuesta-model.component.css'],
})
export class RespuestaModelComponent implements OnInit {
  pets: PetModel = new PetModel();
  petActualizacion: PetModel = new PetModel();
  puerta = true;
  @Input()
  valorReporte: any;
  arraySegundoReporte: any[] = [];

  @Output()
  textoCambiado: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  textoHijo2: PetModel = new PetModel();
  @Input()
  textoHijo21!: any;
  @Input()
  token: string;

segReporte:SegundoReporte=new SegundoReporte();

  correo: any;
  constructor(private petService: FirebaseService) {
    this.textoHijo21 = '';
    this.token = '';
  }

  ngOnInit(): void {
    this.textoHijo2.$key = this.textoHijo21;
  }
  inicio(form:NgForm) {
    this.textoHijo2.$key = this.textoHijo21;
   // console.log(this.textoHijo21);

    this.segundoReporte(this.textoHijo2,form);
  }
  segundoReporte(texto: PetModel,form:NgForm) {
    this.correo = localStorage.getItem('email')
    if(this.correo='undefined'){
      this.correo='Anónimo'
    }

    this.textoHijo2.$key == this.textoHijo21;

    if (this.textoHijo2.segundoReporte) {
   //   console.log(        this.pets.segundoReporte
     //   )
      this.arraySegundoReporte.push(
       // this.textoHijo2.segundoReporte,
        this.pets.segundoReporte
      );
       this.textoHijo2.nombre=this.correo
      this.textoHijo2.segundoReporte.reporte = this.arraySegundoReporte.toString();
this.segReporte.nombre=this.correo;
this.segReporte.reporte=this.arraySegundoReporte.toString();
this.segReporte.id=UUID.UUID();
  
    } else {
      this.arraySegundoReporte.push(
        // this.textoHijo2.segundoReporte,
         this.pets.segundoReporte
       );
   //   console.log(this.valorReporte);
      this.petService.getPet(this.textoHijo21).subscribe((resp) => {
        console.log(resp);
      });
      this.textoHijo2.$key = this.textoHijo21;
  //    console.log( this.textoHijo2.$key);

      this.textoHijo2.segundoReporte = this.pets.segundoReporte;
 //     console.log( this.textoHijo2.segundoReporte);

      this.textoHijo2.nombre=this.correo
 //     console.log(   this.textoHijo2.nombre);

      this.segReporte.nombre=this.correo
    //  console.log(   this.segReporte.nombre);

      this.segReporte.reporte=this.arraySegundoReporte.toString();
     // console.log(   this.segReporte.reporte);

      this.segReporte.id=UUID.UUID();
   //   console.log(   this.segReporte.id);

      // this.pets.$key=this.valorReporte;
    }
 //   console.log(this.textoHijo21,this.segReporte)
    this.petService
      .actualizarReporteConModelo(this.textoHijo21, this.segReporte)
      .subscribe((respuesta) => {
     //   console.log(respuesta);
      });


    this.arraySegundoReporte.length = 0;
    this.pets.segundoReporte?.reporte == '';
    this.textoHijo2=new PetModel()
    form.resetForm();

  }
}
