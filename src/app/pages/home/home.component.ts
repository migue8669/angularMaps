import { Component, OnInit } from '@angular/core';
import { SegundoReporte } from 'src/app/models/segundoReporte.model';
import { PetModel } from 'src/app/models/pet.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  textoHijo11: PetModel[] = [];
  textoHijo1: PetModel[] = [];
  segundoReporteMain:SegundoReporte[]=[];
  selectedImage: any = null;
  emailEnviado:any=null;
  arrayReporte:any=[];
  arrayUbicacion:any=[];
  puerta:boolean=false;
  constructor() { }

  ngOnInit() {
  }

}
