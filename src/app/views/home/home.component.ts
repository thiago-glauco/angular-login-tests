import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RegisteredUser } from '../../configs/registered-user';

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
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.fbUser =  this.angularFireAuth.auth.currentUser;
    if ( this.fbUser ) {
      this.registeredUserDoc = this.afs.doc<RegisteredUser>('usuarios/' + this.fbUser.uid );
      this.registeredUserData = this.registeredUserDoc.valueChanges();
      console.dir(this.registeredUserData);
    }
  }

}