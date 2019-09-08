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
  usersCollectionRef: AngularFirestoreCollection<RegisteredUser>;
  registeredUserDoc: AngularFirestoreDocument<RegisteredUser>;

  //Form variables:
  hidePassword: boolean = true;
  user: User = new User();
  

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
      this.angularFireAuth.auth.createUserWithEmailAndPassword( this.user.email, this.user.password )
        .then( ( userCredential ) => {
          console.dir(userCredential);
          this.fbUser = userCredential.user;

          //cria uma referência ao documento do usuário no Firestore e cria o documento
          this.registeredUserDoc = this.afs.doc('usuarios/' + this.user.email);
          this.registeredUserDoc.set(
            { name: "", email: this.fbUser.email,
            verified: this.fbUser.emailVerified,
            fbUserid: this.fbUser.uid });
          
          //envia o e-mail de confirmação para o usuário.
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