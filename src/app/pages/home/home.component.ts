import { Component, OnInit } from '@angular/core';
import { SegundoReporte } from 'src/app/models/segundoReporte.model';
import { PetModel } from 'src/app/models/pet.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  textoHijo11!: string;
  textoHijo1: PetModel= new PetModel();
  segundoReporteMain:any;
  selectedImage: any = null;
  emailEnviado:any=null;
  arrayReporte:any=[];
  arrayUbicacion:any=[];
  puerta:any=null;
  constructor() { }

  ngOnInit() {
  }

}
