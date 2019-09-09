import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { User } from '../../configs/user';
import { Address } from '../../configs/address';
import { UserPersonalData } from '../../configs/user-personal-data';
import { Router } from '@angular/router';

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
  @Output() userHasLoggedIn = new EventEmitter<boolean>();

  constructor(
    public angularFireAuth: AngularFireAuth,
    //dialog para recuperar senha
    public recoverPasswordDialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.fbUser = this.angularFireAuth.auth.currentUser //Obtem o valor do objeto current user;
    console.dir(this.fbUser);
  }

  loginUser() {
    //verifica se há sessão válida de usuário. Se houver,envia mensagem ao usuário solicitando logout da sessão anterior
    //antes de efetuar um novo login
    if ( !this.fbUser ) {
      this.angularFireAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
      .then( (result ) => {
        console.dir("login success");
        console.dir( result );
        if(this.angularFireAuth.auth.currentUser.emailVerified){
          this.fbUser = this.angularFireAuth.auth.currentUser;
          this.userHasLoggedIn.emit(true);
        } else {
          //usuário não verificado
          this.angularFireAuth.auth.signOut();
          alert("Usuário não ativado. Enviamos um link para ativação da sua conta. Por favor acesse seu e-mail e faça a ativação");
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
    } else {
      alert( `O usuário ${this.fbUser.email} ainda está com sessão válida.\nEfetue o logout do usuário antes de realizar um novo login.`);
    }
  }

  logOut( ) {
    //verifica se a sessão do usuário ainda é válida.
    //se for, finaliza a sessão. Se não for, apenas atribui
    //o valor undef para this.fbUser
    if ( this.angularFireAuth.auth.currentUser ) {
      this.angularFireAuth.auth.signOut()
      .then( ( ) => {
        this.fbUser = this.angularFireAuth.auth.currentUser;
      })
      .catch( (error) => {
        console.dir(error);
        alert("Não foi possível encerrar a sessão.")
      })
    } else {
      this.fbUser = null;
    }
  }

  recuperarSenha( ) {
    const dialogRef = this.recoverPasswordDialog.open(DialogRecoverPassword, {
      width: '250px',
      data: {name: this.user.email}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.user.email = result;
      console.log(this.user.email);
      this.angularFireAuth.auth.sendPasswordResetEmail(this.user.email)
      .then( () => {
        alert(`um link de recuperação de senha foi enviado para ${this.user.email}`)
      }).catch( (error)=> {
        console.log("erro ao tentar recuperar senha:");
        console.dir(error);
        alert(`Ocorreu um erro: ${error.code}`)
      });

    });
    
  }

}

export interface DialogData {
  email: string;
}

@Component({
  selector: 'dialog-recover-password',
  templateUrl: './dialog-recover-password.html',
})
export class DialogRecoverPassword {

  constructor(
    public dialogRef: MatDialogRef<DialogRecoverPassword>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}