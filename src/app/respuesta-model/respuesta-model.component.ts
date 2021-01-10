import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { PetModel } from '../pet-model/pet.model';

@Component({
  selector: 'app-respuesta-model',
  templateUrl: './respuesta-model.component.html',
  styleUrls: ['./respuesta-model.component.css']
})
export class RespuestaModelComponent implements OnInit {
  pets: PetModel = new PetModel();
  petActualizacion:PetModel=new PetModel()
  valorReporte:any;
  arraySegundoReporte:any[]=[];

  @Input()
  key!: string;
  
  constructor(private petService:FirebaseService) { }

  ngOnInit(): void {
  }
  segundoReporte(){
    


    if(this.petActualizacion.segundoReporte){
      console.log(this.petActualizacion.segundoReporte,this.pets.segundoReporte)
      this.arraySegundoReporte.push(this.petActualizacion.segundoReporte,this.pets.segundoReporte);
    
      console.log(this.arraySegundoReporte.toString())
      // this.petActualizacion.segundoReporte=this.arraySegundoReporte.toString()


      
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
      }
}
