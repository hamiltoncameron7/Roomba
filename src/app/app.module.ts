import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { MovingroombaComponent } from './movingroomba/movingroomba.component';
import { ThegridComponent } from './thegrid/thegrid.component';

@NgModule({
  declarations: [
    AppComponent,
    MovingroombaComponent,
    ThegridComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
