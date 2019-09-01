import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import {firebaseConfig} from './configs/firebase-config';
@NgModule({
  imports:      [ BrowserModule, FormsModule,
  AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
