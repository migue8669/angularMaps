import { Component, OnInit } from '@angular/core';
import { PetModel } from 'src/app/pet-model/pet.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  textoHijo11: PetModel[] = [];
  textoHijo1: PetModel[] = [];
  segundoReporteMain:PetModel[]=[];
  selectedImage: any = null;
  emailEnviado:any=null;
  constructor() { }

  ngOnInit() {
  }

}
