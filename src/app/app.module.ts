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
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActualizacionModelComponent } from './actualizacion-model/actualizacion-model.component';
import { ImagenModelComponent } from './imagen-model/imagen-model.component';
import { RespuestaModelComponent } from './respuesta-model/respuesta-model.component';
import { MapaFormComponent } from './mapa-form/mapa-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ComponentService } from './services/component.service';
@NgModule({
  declarations: [
    AppComponent,
    ActualizacionModelComponent,
    ImagenModelComponent,
    RespuestaModelComponent,
    MapaFormComponent,
    RegistroComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAASA9Tbu8ea5MGhF84EcPl8fuOJ_EvH3U',
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [AngularFireStorage,ComponentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
