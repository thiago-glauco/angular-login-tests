import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RegisteredUser } from '../../configs/registered-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //firebase variables
  fbUser: firebase.User;
  usersCollectionRef: AngularFirestoreCollection<RegisteredUser>;
  registeredUserDoc: AngularFirestoreDocument<RegisteredUser>;
  registeredUserData: Observable<RegisteredUser>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) { }

  ngOnInit() {
    this.fbUser =  this.angularFireAuth.auth.currentUser;
    if ( this.fbUser ) {
      this.registeredUserDoc = this.afs.doc<RegisteredUser>('usuarios/' + this.fbUser.uid );
      this.registeredUserData = this.registeredUserDoc.valueChanges();
      console.dir(this.registeredUserData);
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
    this.router.navigate([`/login`]);
  }

}