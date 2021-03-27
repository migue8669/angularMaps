import { Component, OnInit, ViewChild, ElementRef, NgZone, EventEmitter, Output } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

import PlaceResult = google.maps.places.PlaceResult;
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent implements OnInit {
  title: string = 'AGM project';
  latitude!: number;
  longitude!: number;
  zoom!: number;
  address!: string;
  private geoCoder!: google.maps.Geocoder;
  @Output()
  emitUbicacion: EventEmitter<any>=new EventEmitter<any>();
  arrayUbicacion: any[] = [];
  @ViewChild('search')
  public searchElementRef: ElementRef=new ElementRef('');


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }


  ngOnInit() {
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

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          this.arrayUbicacion.push(this.latitude,this.longitude,this.zoom)
          this.emitUbicacion.emit(this.arrayUbicacion)
        });
      });
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: { formatted_address: string; }[], status: string) => {
     
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

}

//   [x: string]: any;
//   public latitude!: number;
//   public longitude!: number;
//   public searchControl!: FormControl;
//   public zoom!: number;
//   public fuzzyControl!: FormControl;
//   public address!: string;


//   @ViewChild("search")
//   public searchElementRef!: ElementRef;

// constructor(
// private mapsAPILoader: MapsAPILoader
// ) {}

// ngOnInit() {
// //set google maps defaults
// this.zoom = 4;
// this.latitude = 39.8282;
// this.longitude = -98.5795;

// //create search FormControl
// this.searchControl = new FormControl();
// this.fuzzyControl = new FormControl();

// //set current position
// this.setCurrentPosition();
// this.setMapsAPILoader();

// //load Places Autocomplete
// this.mapsAPILoader.load().then(() => {
// let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
// types: ["address"]
// });
// autocomplete.addListener("place_changed", () => {
// //get the place result
// let place: google.maps.places.PlaceResult = autocomplete.getPlace();

// //set latitude and longitude
// this.latitude = place.geometry.location.lat();
// this.longitude = place.geometry.location.lng();
// });
// });
// }

// private setCurrentPosition() {
// if ("geolocation" in navigator) {
// navigator.geolocation.getCurrentPosition((position) => {
// this.latitude = position.coords.latitude;
// this.longitude = position.coords.longitude;
// this.zoom = 12;
// });
// }
// }}


//   title: string = 'AGM project';
//   latitude!: number;
//   longitude!: number;
//   zoom!: number;
//   address!: string;
//   private geoCoder:any;
//   public searchControl: FormControl = new FormControl;

//   @ViewChild('search')
//   public searchElementRef!: ElementRef;
  
//   constructor(
//     private mapsAPILoader: MapsAPILoader,
//     private ngZone: NgZone
//   ) { }
  
//   ngOnInit() {
//     this.mapsAPILoader.load().then(() => {
//       this.setCurrentLocation();
//       this.geoCoder = new google.maps.Geocoder;
  
//       let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
//       autocomplete.addListener("place_changed", () => {
//         this.ngZone.run(() => {
//           let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
//           if (place.geometry === undefined || place.geometry === null) {
//             return;
//           }
  
//           this.latitude = place.geometry.location.lat();
//           this.longitude = place.geometry.location.lng();
//           this.zoom = 12;
//         });
//       });
//     });
//   }
  
//   private setCurrentLocation() {
//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         this.latitude = position.coords.latitude;
//         this.longitude = position.coords.longitude;
//         this.zoom = 8;
//         this.getAddress(this.latitude, this.longitude);
//       });
//     }
//   }
  
//   getAddress(latitude: number, longitude: number) {
//     this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: { formatted_address: string; }[], status: string) => {
//       if (status === 'OK') {
//         if (results[0]) {
//           this.zoom = 12;
//           this.address = results[0].formatted_address;
//         } else {
//           window.alert('No results found');
//         }
//       } else {
//         window.alert('Geocoder failed due to: ' + status);
//       }
  
//     });
//   }
// }