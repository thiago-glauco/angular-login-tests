import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

//material design
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';

//image cropper
import { ImageCropperModule } from 'ngx-image-cropper';

//firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';


import { firebaseConfig } from './configs/firebase-config';

//components
import { BasicRegisterFormComponent } from './components/basic-register-form/basic-register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { DialogRecoverPassword } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

//views
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { StorageService } from './services/storage.service';
import { FileUploadComponent } from './components/file-upload/file-upload.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig, 'login-testes'),
    AngularFirestoreModule,
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
    MatDialogModule,
    ImageCropperModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, BasicRegisterFormComponent, LoginFormComponent, RegisterFormComponent, DialogRecoverPassword, LoginComponent, HomeComponent, FileUploadComponent],
  providers: [
  StorageService
  ],
  entryComponents: [
    DialogRecoverPassword
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
