import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { FirebaseService } from './firebase.service';
import { PetModel } from './pet-model/pet.model';
import * as fromStore from './redux';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  [x: string]: any;
  opcion1=false;
  opcion2=false;
  lat: number;
  lng: number;
  zoom: number;
  mapTypeId: string;
  located: boolean;
  pets: PetModel = new PetModel();
  @Input() mascotass: PetModel[] = [];
  markers: PetModel[] = [];
  value: string;
  selectedImage: any = null;
  imgSrc: string="";
  constructor(
    private store: Store<fromStore.AppState>,
    private petService: FirebaseService,
    private modalService: NgbModal
  ) {
    this.lat = 0;
    this.lng = 0;
    this.zoom = 5;
    this.mapTypeId = 'hybrid';
    this.located = false;
    this.value=""
  }
  async ngOnInit() {
    // this.store.dispatch(new fromStore.LoadCustomer());

    this.markers.push(
      {
        lat: 51.673858,
        long: 7.815982,
        reporte: 'A',
        tipoReporte: 'true',
      },
      {
        lat: 51.373858,
        long: 7.215982,
        reporte: 'B',
        tipoReporte: 'false',
      },
      {
        lat: 51.723858,
        long: 7.895982,
        reporte: 'C',
        tipoReporte: 'true',
      }
    );

    this.petService.getAll().subscribe((pets) => {
      console.log(pets);
      this.mascotass = pets;
      console.log(this.mascotass);
    });
    

    //this.petService.getAll().then(pets=>{this.mascotas=pets}).catch(error=>console.log(error));
  }
  // addCustomer(myForm : NgForm){
  //   let userId = new Date().getTime();
  //   let newCustomer = myForm.value;
  //   newCustomer['id'] = userId;

  //   if(newCustomer.name !== null && newCustomer !== undefined){
  //       this.store.dispatch(new fromStore.AddCustomer(newCustomer));
  //       this.closeModal(myForm);
  //   }
  // }
  getCurrentPosition() {

    navigator.geolocation.getCurrentPosition((position) => {
      if(this.opcion1){
        this.pets.tipoReporte="perdida"
      }
      if(this.opcion2){
        this.pets.tipoReporte="abandono"
      }
      
      this.pets.lat = position.coords.latitude;
      // this.lat=position.coords.latitude;
      this.pets.long = position.coords.longitude;
      console.log(this.pets);
      this.petService.crearReporte(this.pets).subscribe((respuesta) => {
        console.log(respuesta);
        this.pets = respuesta;
      });

      this.zoom = 17;
      this.located = true;
    });
  }
  initMap() {
    this.petService.getAll().subscribe((pets) => {
      console.log(pets);
      this.mascotass = pets;
      console.log(this.mascotass);
    });
  }
  open() {
    this.modalService.open( 'a');
  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = "src\assets\image_placeholder.jpg";
      this.selectedImage = null;
    }
  }
}
