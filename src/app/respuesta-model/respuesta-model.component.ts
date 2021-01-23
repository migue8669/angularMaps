import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { SegundoReporte } from '../models/segundoReporte.model';
import { PetModel } from '../models/pet.model';
import { UUID } from 'angular2-uuid';

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
  textoHijo21: string;
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
  inicio() {
    this.textoHijo2.$key = this.textoHijo21;
    console.log(this.token);
    console.log(this.textoHijo21);
    this.segundoReporte(this.textoHijo2);
  }
  segundoReporte(texto: PetModel) {
    this.correo = localStorage.getItem('email')
    if(this.correo='undefined'){
      this.correo='Anónimo'
    }
    console.log(this.correo)
    console.log(this.textoHijo2);
    console.log(this.textoHijo21);
    this.textoHijo2.$key == this.textoHijo21;

    if (this.textoHijo2.segundoReporte) {
      console.log(this.textoHijo2.segundoReporte, this.pets.segundoReporte);
      this.arraySegundoReporte.push(
       // this.textoHijo2.segundoReporte,
        this.pets.segundoReporte
      );
       this.textoHijo2.nombre=this.correo
      console.log(this.arraySegundoReporte.toString());
      this.textoHijo2.segundoReporte = this.arraySegundoReporte.toString();
this.segReporte.nombre=this.correo;
this.segReporte.reporte=this.arraySegundoReporte.toString();
this.segReporte.id=UUID.UUID();
      // this.petService.actualizarReporte(this.valorReporte,this.textoHijo2).subscribe((respuesta)=>{
      //   console.log(respuesta)
      // });

      // this.arraySegundoReporte.forEach(i=>{this.petActualizacion.segundoReporte=i})
      // console.log(this.petActualizacion.segundoReporte)
    } else {
      console.log(this.valorReporte);
      this.petService.getPet(this.textoHijo21).subscribe((resp) => {
        console.log(resp);
      });
      console.log(this.petActualizacion);
      this.textoHijo2.$key = this.textoHijo21;
      this.textoHijo2.segundoReporte = this.pets.segundoReporte;
      this.textoHijo2.nombre=this.correo
      this.segReporte.nombre=this.correo
      this.segReporte.reporte=this.pets.segundoReporte;
      this.segReporte.id=UUID.UUID();

      console.log(this.segReporte);
      // this.pets.$key=this.valorReporte;
    }
    this.petService
      .actualizarReporteConModelo(this.textoHijo21, this.segReporte)
      .subscribe((respuesta) => {
        console.log(respuesta);
      });

    // this.petActualizacion.$key=this.key;

    // this.petService.getPet(this.key).subscribe(resp=>{this.pets=resp,
    //   console.log(this.pets)})
    // this.petActualizacion=this.pets;

    //      console.log(this.petActualizacion)
    //     // this.pets.$key=this.valorReporte;
    // this.petService.actualizarReporte(this.valorReporte,this.petActualizacion).subscribe((respuesta)=>{
    //   console.log(respuesta)
    // });
    this.arraySegundoReporte.length = 0;
    this.pets.segundoReporte = '';
  }
}
