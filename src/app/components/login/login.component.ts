import { Component, OnInit, AfterViewInit } from '@angular/core';
import { JwtResponse } from 'src/app/models/jwtResponse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { JwtHelperService } from "@auth0/angular-jwt";
 
const helper = new JwtHelperService();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit ,AfterViewInit{

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
error=false;
msgerror=''

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
   ) {
    // redirect to home if already logged in
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }
ngAfterViewInit(){
 console.log(this.route.snapshot)
}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
     });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onLogin() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginForm.value).subscribe(data => {
        const jwt = data as JwtResponse;
        console.log(data);
        console.log(helper.decodeToken(jwt.token))
        this.authenticationService.saveToken(jwt.token);
        // this.router.navigate([this.returnUrl]);
       if (this.authenticationService.isAdmin()) {
        
        this.router.navigateByUrl('dashboard'); } 
        else {  this.router.navigateByUrl('home'); }
       
      },
      error => {
        this.error=true 
        this.msgerror='Email ou Mot de passe incorrect' ;
         this.loading = false;
        });
  }

}
