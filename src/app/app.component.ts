import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from './firebase.service';
import { PetModel } from './pet-model/pet.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  lat:number ;
  lng: number ;
  zoom:number ;
  mapTypeId:string;
  located:boolean;
  pets:PetModel=new PetModel();
  mascotas:PetModel[]=[];

  constructor(    private petService:FirebaseService
    ){
    this.lat=40;
    this.lng=-3;
    this.zoom=6;
    this.mapTypeId="hybrid";
    this.located=false;
  }
  ngOnInit(){
//this.petService.getAll().subscribe(resp=>{console.log(resp);
this.petService.getAll()
.subscribe(pets=>this.mascotas=pets)


}    
  
  getCurrentPosition(){
    navigator.geolocation.getCurrentPosition(position=>{
      this.pets.lat=position.coords.latitude;
     // this.lat=position.coords.latitude;
      this.pets.long=position.coords.longitude;
      console.log(this.pets);
      this.petService.crearReporte(this.pets)
      .subscribe(respuesta=>{console.log(respuesta)});

      this.zoom=17;
      this.located=true;

    })
  }
  guardar(formulario:NgForm){
    console.log(formulario);
    console.log(this.pets);
  }
}