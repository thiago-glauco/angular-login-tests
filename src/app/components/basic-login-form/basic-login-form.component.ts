import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { User } from '../../configs/user';
import { RegisteredUser } from '../../configs/registered-user';

@Component({
  selector: 'app-basic-login-form',
  templateUrl: './basic-login-form.component.html',
  styleUrls: ['./basic-login-form.component.css']
})
export class BasicLoginFormComponent implements OnInit {

  //firebase variables
  fbUser: firebase.User;
  usersCollection: AngularFirestoreCollection<RegisteredUser>;
  //Form variables:
  hidePassword: boolean = true;
  user: User = new User();
  registeredUserDoc: AngularFirestoreDocument<RegisteredUser>;

  constructor(
    public angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore ) { 
    }

  ngOnInit() {
    //cria uma refererencia a coleção user;
    this.fbUser = this.angularFireAuth.auth.currentUser //Obtem o valor do objeto current user;
    console.dir(this.fbUser);
  }

  createUser() {
    if (!this.fbUser ) {
      //cria uma referência para o documento do usuário, se ele existir
      this.registeredUserDoc = this.afs.doc('users/' + this.user.email);
      console.dir(this.registeredUserDoc);
      this.angularFireAuth.auth.createUserWithEmailAndPassword( this.user.email, this.user.password )
        .then( ( userCredential ) => {
          console.dir(userCredential);
          this.fbUser = userCredential.user;
          
          this.fbUser.sendEmailVerification()
            .then( (info) => {
              console.log("email send");
              console.dir(info);
              this.angularFireAuth.auth.signOut();
            })
            .catch((error) => {
              console.dir(error);
            });
        } )
        .catch(function(error) {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
        
    }
  }

  logOut( ) {
    this.angularFireAuth.auth.signOut();
  }

}