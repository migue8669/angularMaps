import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { SegundoReporte } from '../models/segundoReporte.model';
import { PetModel } from '../models/pet.model';
import { ComponentService } from '../services/component.service';

@Component({
  selector: 'app-actualizacion-model',
  templateUrl: './actualizacion-model.component.html',
  styleUrls: ['./actualizacion-model.component.css'],
})
export class ActualizacionModelComponent implements OnInit {
   segundoReporteView: SegundoReporte[]=[];
  //segundoReporteView: any;

  @Input()
  segundoReporte: SegundoReporte[]=[];
  info: any=null;

  constructor(
    private petService: FirebaseService,
    private componentService: ComponentService
  ) {}

  ngOnInit(): void {
    }

 
   openDialogo(value: string) {
    this.info=value;
    console.log(this.info);
    


    this.segundoReporteView = this.segundoReporte;
    //console.log(this.segundoReporte);
  }
}
