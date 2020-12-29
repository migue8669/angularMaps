import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReduxModule } from './redux/redux.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './redux/reducers/app.reducer';
import { PopUpFotoComponent } from './pop-up-foto/pop-up-foto.component';
@NgModule({
  declarations: [
    AppComponent,
    PopUpFotoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(reducer),

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAtiYd4amCt0El9P0Ft0JOllAXmQOH7DAI'
    }),
    AppRoutingModule,
    ReduxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
