import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ComponentService } from '../component.service';
import { FirebaseService } from '../firebase.service';
import { ImagenModelComponent } from '../imagen-model/imagen-model.component';
import { PetModel } from '../pet-model/pet.model';

@Component({
  selector: 'app-mapa-form',
  templateUrl: './mapa-form.component.html',
  styleUrls: ['./mapa-form.component.css']
})
export class MapaFormComponent implements OnInit {
  opcion1 = false;
  opcion2 = false;
  lat: number;
  lng: number;
  zoom: number;
  mapTypeId: string;
  located: boolean;
  value: string;
  @Input() mascotass: PetModel[] = [];
  URLPublica = "";
  valorReporte:any;
 petActualizacion:PetModel=new PetModel()
  pets: PetModel = new PetModel();
  v:any;
  segundoReporteView:any;
  @Input()
  selectedImage!: string;
  @Input()
  textoHijo2: PetModel[] = [];
@Output()
textoCambiado:EventEmitter<PetModel>=new EventEmitter<PetModel>();
@Output()
textoCambiado2:EventEmitter<PetModel>=new EventEmitter<PetModel>();
  arraySegundoReporte:any[]=[];

  // @Input()
  // segundoReporte!: string;

  constructor(private messageService: ComponentService,
    private petService: FirebaseService,
    private route: ActivatedRoute
  ) {
    this.lat = 0;
    this.lng = 0;
    this.zoom = 5;
    this.mapTypeId = 'hybrid';
    this.located = false;
    this.value = '';
  }

  async ngOnInit() {
    // this.store.dispatch(new fromStore.LoadCustomer());



    this.petService.getAll().subscribe((pets) => {
      console.log(pets);
      this.mascotass = pets;
      console.log(this.mascotass);
    });

  }
  initMap() {
    this.petService.getAll().subscribe((pets) => {
      console.log(pets);
      this.mascotass = pets;
      console.log(this.mascotass);
    });

    
  }

  primerReporte() {
console.log(this.URLPublica)
    navigator.geolocation.getCurrentPosition((position) => {
      if (this.opcion1) {
        this.pets.tipoReporte = 'perdida';
      }
      if (this.opcion2) {
        this.pets.tipoReporte = 'abandono';
      }

     this.lat= position.coords.latitude;
     this.lng= position.coords.longitude;

      this.mascotass.forEach(r=>{console.log(this.pets.lat=r.lat)})
      console.log(this.lat)
      this.mascotass.forEach(r=>{console.log(this.pets.long=r.long)})

      console.log(this.lng)
      if(this.pets.lat == this.lat && this.pets.long==this.lng ){
        console.log(this.pets.lat);

        this.pets.lat = position.coords.latitude+0.000010;
        console.log(this.pets.lat);

        this.pets.long = position.coords.longitude+0.000010;
        // this.pets.foto = this.URLPublica;
        this.pets.foto = this.selectedImage;

        console.log(this.pets);

      }else{
      this.pets.lat = position.coords.latitude;
      this.pets.long = position.coords.longitude;
      // this.pets.foto = this.URLPublica;
      this.pets.foto = this.selectedImage ;    
      

      console.log(this.pets);
      }
      this.petService.crearReporte(this.pets).subscribe((respuesta) => {
        console.log(respuesta);
        this.pets = respuesta;
      });

      this.zoom = 17;
      this.located = true;
    });
  }
   openDialog(key:PetModel){
    this.valorReporte=key;
    this.valorReporte.$key=key.$key;
    console.log(this.valorReporte)
// this.v=  this.petService.getPet(this.valorReporte).subscribe(
//       resp=>{this.petActualizacion=resp,      console.log(this.petActualizacion)
      // }
this.textoCambiado.emit(this.valorReporte);      // );
  this.textoCambiado2.emit(this.valorReporte.$key);
  }

  async openDialogo(segundoReporte:PetModel){
    this.segundoReporteView=segundoReporte;
    console.log(this.segundoReporteView)

    
  }
 }
