import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input( ) user;
  profileImg: string;

  //cropped image variables:
  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(
    private storageService: StorageService,
    private angularFireAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.getDownloadUrl(this.user.uid + '/' + "perfil.png");
  }

  uploadFile( ) {
    //const file = event.target.files[0];
    console.log("uploading file");
    const uploadTask = this.storageService.uploadString(this.croppedImage.split(',')[1], 'usuarios/'+this.user.uid + '/' + "perfil.png" );
    uploadTask.then( result => {
      console.dir(result);
      this.getDownloadUrl(this.user.uid + '/' + "perfil.png");
    })
      .catch(error => {
        console.log("erro ao realizar upload");
        console.dir(error)});
  }

  getDownloadUrl(file) {
    this.storageService.downloadUrl(file)
    .then( (result) => this.profileImg = result )
    .catch( (err) => console.log("erro ao baixar imagem"));
  }

  //cropped image methods
    
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    //this.croppedImage = event.file;
    console.log("image data: ");
    console.dir(this.croppedImage);
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

}