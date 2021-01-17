import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentService } from '../services/component.service';
import { FirebaseService } from '../firebase.service';
import { PetModel } from '../pet-model/pet.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-mapa-form',
  templateUrl: './mapa-form.component.html',
  styleUrls: ['./mapa-form.component.css'],
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
  URLPublica = '';
  valorReporte: any;
  petActualizacion: PetModel = new PetModel();
  pets: PetModel = new PetModel();
  v: any;
  segundoReporteView: any;
  @Input()
  selectedImage!: string;
  @Input()
  textoHijo2: PetModel[] = [];
  @Output()
  textoCambiado: EventEmitter<PetModel> = new EventEmitter<PetModel>();
  @Output()
  textoCambiado2: EventEmitter<PetModel> = new EventEmitter<PetModel>();
  @Output()
  emailReporte: EventEmitter<any> = new EventEmitter<any>();
  abrirModal: boolean=true;
  @Output()
  segundoReporte: EventEmitter<PetModel> = new EventEmitter<PetModel>();
  arraySegundoReporte: any[] = [];
  token: any[] = [];
  puerta: boolean = true;
  // @Input()
  // segundoReporte!: string;

  constructor(
    private messageService: ComponentService,

    private petService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router,
    private componentService: ComponentService,
    private auth: AuthService
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
    console.log(this.URLPublica);
    navigator.geolocation.getCurrentPosition((position) => {
      if (this.opcion1) {
        this.pets.tipoReporte = 'perdida';
      }
      if (this.opcion2) {
        this.pets.tipoReporte = 'abandono';
      }

      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;

      this.mascotass.forEach((r) => {
        console.log((this.pets.lat = r.lat));
      });
      console.log(this.lat);
      this.mascotass.forEach((r) => {
        console.log((this.pets.long = r.long));
      });

      console.log(this.lng);
      if (this.pets.lat == this.lat && this.pets.long == this.lng) {
        console.log(this.pets.lat);

        this.pets.lat = position.coords.latitude + 0.00001;
        console.log(this.pets.lat);

        this.pets.long = position.coords.longitude + 0.00001;
        // this.pets.foto = this.URLPublica;
        this.pets.foto = this.selectedImage;

        console.log(this.pets);
      } else {
        this.pets.lat = position.coords.latitude;
        this.pets.long = position.coords.longitude;
        // this.pets.foto = this.URLPublica;
        this.pets.foto = this.selectedImage;

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
  openDialog(key: PetModel) {
    this.valorReporte = key;
    this.valorReporte.$key = key.$key;
    // this.abrirModal.emit(this.puerta);
    // console.log(this.puerta);
this.componentService.sendMessage(this.abrirModal)
    console.log(this.valorReporte);
    // this.v=  this.petService.getPet(this.valorReporte).subscribe(
    //       resp=>{this.petActualizacion=resp,      console.log(this.petActualizacion)
    // }
    this.textoCambiado.emit(this.valorReporte); // );
    this.textoCambiado2.emit(this.valorReporte.$key);
  }
  openDialogo(segundoReporte: PetModel) {
    //  this.componentService.getMessage().subscribe(res=>{this.token=res} );
    this.token = localStorage.getItem('email');
    console.log(this.token);

    this.segundoReporte.emit(this.pets);
    this.emailReporte.emit(this.token);
    this.segundoReporteView = segundoReporte;
    
    // this.messageService.sendMessage(segundoReporte);
  }
  salir() {
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }
}
