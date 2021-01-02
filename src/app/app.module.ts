import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReduxModule } from './redux/redux.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './redux/reducers/app.reducer';
import { PopUpFotoComponent } from './pop-up-foto/pop-up-foto.component';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
@NgModule({
  declarations: [
    AppComponent,
    PopUpFotoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
     StoreModule.forRoot(reducer),

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAASA9Tbu8ea5MGhF84EcPl8fuOJ_EvH3U'
    }),
    AppRoutingModule,
    ReduxModule,
    ReactiveFormsModule
  ],
  providers: [AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
