import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

//material design
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'; 
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatDialogModule} from '@angular/material/dialog'; 

//firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import {firebaseConfig} from './configs/firebase-config';
import { BasicLoginFormComponent } from './basic-login-form/basic-login-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { DialogRecoverPassword } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';


@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig, 'login-testes'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    MatDialogModule
    ],
  declarations: [ AppComponent, HelloComponent, BasicLoginFormComponent, LoginFormComponent, RegisterFormComponent, DialogRecoverPassword ],
  
  entryComponents: [
    DialogRecoverPassword
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
