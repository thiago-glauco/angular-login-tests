import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';

@Injectable()
export class StorageService {

  storageRef: AngularFireStorageReference;
  constructor(
    private storage: AngularFireStorage
  ) {
      this.storageRef = this.storage.ref('usuarios');
      console.dir(this.storageRef);
   }

  uploadFile( file, userFolder): AngularFireUploadTask {
    let userFolderRef: AngularFireStorageReference = this.storageRef.child(userFolder);
    return userFolderRef.put(file);
  }

  uploadString( file, userDestiny): AngularFireUploadTask {
    let fileRef: AngularFireStorageReference = this.storage.ref(userDestiny);
    return fileRef.putString(file, 'base64', {contentType:'image/png'} );
  }

  downloadUrl( fullPath ) {
    let fileRef: AngularFireStorageReference = this.storage.ref( 'usuarios/' + fullPath );
    return fileRef.getDownloadURL( ).toPromise();
  }

}