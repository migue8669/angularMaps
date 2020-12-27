import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  @Input() mascotass:PetModel[]=[];
  markers:   PetModel [] = [];

  constructor(    private petService:FirebaseService
    ){
    this.lat=0;
    this.lng=0;
    this.zoom=6;
    this.mapTypeId="hybrid";
    this.located=false;
  }
  async  ngOnInit(){
 this.markers.push( {
    lat: 51.673858,
    long: 7.815982,
    reporte: 'A',
    tipoReporte: 'true'
  },
  {
    lat: 51.373858,
    long: 7.215982,
    reporte: 'B',
    tipoReporte: 'false'
  },
  {
    lat: 51.723858,
    long: 7.895982,
    reporte: 'C',
    tipoReporte: 'true'
  }
 )

this.petService.getAll()
.subscribe(pets=>{
  console.log(pets);
  this.mascotass=pets
  console.log(this.mascotass);}
)

//this.petService.getAll().then(pets=>{this.mascotas=pets}).catch(error=>console.log(error));

}    
  
  getCurrentPosition(){
    navigator.geolocation.getCurrentPosition(position=>{
      this.pets.lat=position.coords.latitude;
     // this.lat=position.coords.latitude;
      this.pets.long=position.coords.longitude;
      console.log(this.pets);
      this.petService.crearReporte(this.pets)
      .subscribe(respuesta=>{console.log(respuesta);
      this.pets=respuesta});

      this.zoom=17;
      this.located=true;

    })
  }
   initMap(){

    this.petService.getAll()
    .subscribe(pets=>{
      console.log(pets);
      this.mascotass=pets
      console.log(this.mascotass);}
    )

  } 
}