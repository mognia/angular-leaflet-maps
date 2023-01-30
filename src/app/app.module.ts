import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    MapComponent
  ],
    imports: [
        BrowserModule,
        LeafletModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
