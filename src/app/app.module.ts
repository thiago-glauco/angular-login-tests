import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

//firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import {firebaseConfig} from './configs/firebase-config';
import { BasicLoginFormComponent } from './basic-login-form/basic-login-form.component';
@NgModule({
  imports:      [ BrowserModule, FormsModule,
  AngularFireModule.initializeApp(firebaseConfig, 'login-testes'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule, ],
  declarations: [ AppComponent, HelloComponent, BasicLoginFormComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
