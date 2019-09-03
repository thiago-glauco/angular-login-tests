import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { User } from '../configs/user';
import { Address } from '../configs/address';
import { UserPersonalData } from '../configs/user-personal-data';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  //firebase variables
  fbUser: firebase.User;
  
  //Form variables:
  hidePassword: boolean = true;
  user: User = new User();

  constructor(public angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.fbUser = this.angularFireAuth.auth.currentUser //Obtem o valor do objeto current user;
    console.dir(this.fbUser);
  }

  createUser() {
    if (!this.fbUser ) {
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
            alert('Senha fraca. Tente outra senha.');
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