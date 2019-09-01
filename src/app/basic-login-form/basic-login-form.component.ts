import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-basic-login-form',
  templateUrl: './basic-login-form.component.html',
  styleUrls: ['./basic-login-form.component.css']
})
export class BasicLoginFormComponent implements OnInit {
  fbUser: firebase.User;
  
  constructor(public angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.fbUser = this.angularFireAuth.auth.currentUser //Obtem o valor do objeto current user;
    console.dir(this.fbUser);
  }

}