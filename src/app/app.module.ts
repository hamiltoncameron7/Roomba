import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MovingroombaComponent } from './movingroomba/movingroomba.component';

@NgModule({
  declarations: [
    AppComponent,
    MovingroombaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
