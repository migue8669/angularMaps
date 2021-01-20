import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentService } from '../services/component.service';
import { FirebaseService } from '../firebase.service';
import { PetModel } from '../pet-model/pet.model';
import { AuthService } from '../services/auth.service';
import { SegundoReporte } from '../models/segundoReporte.model';
import { ActualizacionModelComponent } from '../actualizacion-model/actualizacion-model.component';
import { UbicacionModel } from '../models/ubicacion.model';
import { MapsAPILoader } from '@agm/core';

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
  address: string;
  private geoCoder: google.maps.Geocoder;

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
  segReporte: SegundoReporte = new SegundoReporte;
  @Output()
  emitReport: EventEmitter<any>=new EventEmitter<any>();
  arraySegundoReporte: any[] = [];
  token: any[] = [];
  puerta: boolean = true;
  reporte: any ;
  nombre:any;
  @Input()
  ubicacionSearch:UbicacionModel=new UbicacionModel;

  // @Input()
  // segundoReporte!: string;

  constructor(
    private messageService: ComponentService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
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
  @ViewChild('search')
  public searchElementRef: ElementRef=new ElementRef('');



  ngOnInit() {
    this.petService.getAll().subscribe((pets) => {
      console.log(pets);
      this.mascotass = pets;
      console.log(this.mascotass);
    });
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          console.log("return")

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
     
        });
      });
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    console.log("set")
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.lat, this.lng);
      });
    }
  }


  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.getAddress(this.lat, this.lng);
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: { formatted_address: string; }[], status: string) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

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
    this.valorReporte = segundoReporte;
    console.log(this.valorReporte)

    this.petService.getReporteAll(this.valorReporte.$key).subscribe((res)=>{res.forEach(element=> {
      this.reporte=element.reporte,console.log(this.reporte),  this.nombre=element.nombre,this.arraySegundoReporte.push(this.reporte,this.nombre),
       this.emitReport.emit(this.arraySegundoReporte)

    })
    }); 
   // this.valorReporte.$key = segundoReporte.$key;
    //  this.componentService.getMessage().subscribe(res=>{this.token=res} );
    this.token = localStorage.getItem('email');
//this.reporte.push(segundoReporte)
    console.log(this.segReporte);
    console.log(this.reporte);

  this.componentService.sendMessage(segundoReporte);
    this.emailReporte.emit(this.token);
    this.segundoReporteView = segundoReporte;
    // this.messageService.sendMessage(segundoReporte);
  }
  salir() {
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }
}
