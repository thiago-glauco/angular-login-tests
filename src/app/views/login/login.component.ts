import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fbUser: firebase.User;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
   ) { }

  ngOnInit() {
    this.fbUser = this.angularFireAuth.auth.currentUser;
    if( this.fbUser ) {
      console.log("i ping here");
      this.router.navigate([`/home`]);
    }
  }

  userLogged(logged: boolean ){
    if( logged ) {
      this.router.navigate([`/home`]);
    }
  }

}