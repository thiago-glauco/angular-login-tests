import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { User } from '../configs/user';
import { Address } from '../configs/address';
import { UserPersonalData } from '../configs/user-personal-data';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
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

  loginUser() {
    this.angularFireAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
    .then( (result ) => {
      console.dir("login success");
      console.dir( result );
      if(this.angularFireAuth.auth.currentUser.emailVerified){
        this.fbUser = this.angularFireAuth.auth.currentUser;
      } else {
        //usuário não verificado
        alert("Usuário não ativado. Enviamos um link para ativação da sua conta. Por favor acesse seu e-mail e faça a verificação");
      }
    } )
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Login error: " + error.code + " " + error.message);
      alert(`Ocorreu um erro em seu login: ${error.code} \n ${error.message}`);
      // ...
    });
  }

  logOut( ) {
    this.angularFireAuth.auth.signOut();
    this.fbUser = this.angularFireAuth.auth.currentUser;
  }

}