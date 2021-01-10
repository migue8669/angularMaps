import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActualizacionModelComponent } from './actualizacion-model/actualizacion-model.component';
import { ImagenModelComponent } from './imagen-model/imagen-model.component';
import { RespuestaModelComponent } from './respuesta-model/respuesta-model.component';
import { MapaFormComponent } from './mapa-form/mapa-form.component';
@NgModule({
  declarations: [
    AppComponent,
    ActualizacionModelComponent,
    ImagenModelComponent,
    RespuestaModelComponent,
    MapaFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAASA9Tbu8ea5MGhF84EcPl8fuOJ_EvH3U'
    }),
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
