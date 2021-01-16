import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { PetModel } from '../pet-model/pet.model';
import { ComponentService } from '../services/component.service';

@Component({
  selector: 'app-actualizacion-model',
  templateUrl: './actualizacion-model.component.html',
  styleUrls: ['./actualizacion-model.component.css'],
})
export class ActualizacionModelComponent implements OnInit {
  segundoReporteView: PetModel = new PetModel();
  @Input()
  segundoReporte: PetModel = new PetModel();
  @Input()

  token: any = null;

  constructor(
    private petService: FirebaseService,
    private componentService: ComponentService
  ) {}

  ngOnInit(): void {
    console.log(this.segundoReporte);
    this.componentService.getMessage().subscribe(res=>{this.token=res
    });
    console.log(this.token);

  }
  async openDialogo() {
    this.componentService.getMessage().subscribe(res=>{this.token=res
    });


    this.segundoReporteView = this.segundoReporte;
    //console.log(this.segundoReporte);
    console.log(this.token);
  }
}
