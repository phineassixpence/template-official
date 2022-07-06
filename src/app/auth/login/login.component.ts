import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/firebase/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public show: boolean = false;
  public loginForm: FormGroup | any;
  public errorMessage: any;

  constructor(public authService: AuthService, private fb: FormBuilder) {
    //firebase
      this.loginForm = this.fb.group({
        email: ['spruko@template.com', [Validators.required, Validators.email]],
        password: ['spruko', Validators.required]
      });
  }

  showPassword() {
    this.show = !this.show;
  }
  
  // Login With Google
  loginGoogle() {
    this.authService.GoogleAuth();
  }

  // Login With Twitter
  loginTwitter(): void {
    this.authService.signInTwitter();
  }

  // Login With Facebook
  loginFacebook() {
    this.authService.signInFacebok();
  }

  // Simple Login
  login() {
    this.authService.SignIn(this.loginForm.value['email'], this.loginForm.value['password']);
  }

  ngOnInit(): void {}

}
