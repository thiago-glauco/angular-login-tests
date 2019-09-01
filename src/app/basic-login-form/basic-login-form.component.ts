import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { User } from '../shared/user';
import { Address } from '../shared/address';
import { UserPersonalData } from '../shared/user-personal-data';

@Component({
  selector: 'app-basic-login-form',
  templateUrl: './basic-login-form.component.html',
  styleUrls: ['./basic-login-form.component.css']
})
export class BasicLoginFormComponent implements OnInit {
  fbUser: firebase.User;
    //Form variables:
  hidePassword: boolean = true;
  user: User = new User();

  constructor(public angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.fbUser = this.angularFireAuth.auth.currentUser //Obtem o valor do objeto current user;
    console.dir(this.fbUser);
  }

}