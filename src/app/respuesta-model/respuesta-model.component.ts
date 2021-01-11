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
  puerta=true;
  @Input()
  valorReporte:any;
  arraySegundoReporte:any[]=[];

@Output()
  textoCambiado:EventEmitter<string>=new EventEmitter<string>();

  @Input()
  textoHijo2: PetModel = new PetModel;
  @Input()
  textoHijo21: string ;
  constructor(private petService:FirebaseService) { 
    this.textoHijo21=""
  }

  ngOnInit(): void {
    this.textoHijo2.$key=this.textoHijo21;

  }
  inicio(){
    this.textoHijo2.$key=this.textoHijo21;
    console.log(this.textoHijo2)
    console.log(this.textoHijo21)
  this.segundoReporte(this.textoHijo2)
  }
  segundoReporte(texto:PetModel){

    console.log(this.textoHijo2)
    console.log(this.textoHijo21)
    this.textoHijo2.$key==this.textoHijo21;
 
    if(this.textoHijo2.segundoReporte){
      console.log(this.textoHijo2.segundoReporte,this.pets.segundoReporte)
      this.arraySegundoReporte.push(this.textoHijo2.segundoReporte,this.pets.segundoReporte);
    
      console.log(this.arraySegundoReporte.toString())
       this.textoHijo2.segundoReporte=this.arraySegundoReporte.toString();

      // this.petService.actualizarReporte(this.valorReporte,this.textoHijo2).subscribe((respuesta)=>{
      //   console.log(respuesta) 
      // });

      // this.arraySegundoReporte.forEach(i=>{this.petActualizacion.segundoReporte=i})
      // console.log(this.petActualizacion.segundoReporte)
    }else{
      console.log(this.valorReporte)
      this.petService.getPet(this.textoHijo21).subscribe(
        resp=>{console.log(resp)});
     console.log(this.petActualizacion)
    this.textoHijo2.$key=this.textoHijo21;
    this.textoHijo2.segundoReporte=this.pets.segundoReporte;
         console.log(this.textoHijo2)
        // this.pets.$key=this.valorReporte;
    
    }this.petService.actualizarReporte(this.textoHijo21,this.textoHijo2).subscribe((respuesta)=>{
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
    this.arraySegundoReporte.length=0;
    this.pets.segundoReporte=""
    this.puerta=false
      }


}
