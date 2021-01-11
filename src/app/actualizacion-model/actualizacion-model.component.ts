import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { PetModel } from '../pet-model/pet.model';

@Component({
  selector: 'app-actualizacion-model',
  templateUrl: './actualizacion-model.component.html',
  styleUrls: ['./actualizacion-model.component.css']
})
export class ActualizacionModelComponent implements OnInit {
  segundoReporteView: PetModel = new PetModel;
  @Input()
  segundoReporte:PetModel = new PetModel;

  constructor(private petService:FirebaseService) { }

  ngOnInit(): void {
    console.log(this.segundoReporte);

  }
  async openDialogo(){
    this.segundoReporteView=this.segundoReporte;
    console.log(this.segundoReporte)

    
  }
}
