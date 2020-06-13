import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { JwtResponse } from 'src/app/models/jwtResponse';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error=false ;
msgerror=''   
  

 constructor(
   private formBuilder: FormBuilder,
   private router: Router,
   private authenticationService: AuthenticationService,
   private userService: UserService,
  ) {
   // redirect to home if already logged in
   if (this.authenticationService.isAuthenticated()) {
     this.router.navigate(['/']);
   }
 }

 ngOnInit() {
   this.registerForm = this.formBuilder.group({
     name: ['', [Validators.required, Validators.minLength(4)]],
     password: ['', [Validators.required, Validators.minLength(6)]],
     email: ['', Validators.required, Validators.email],
   });
 }

 // convenience getter for easy access to form fields
 get f() { return this.registerForm.controls; }

 onSubmit() {
   this.submitted = true;

   // stop here if form is invalid
   if (this.registerForm.invalid) {
     return;
   }

   this.loading = true;
   this.userService.register(this.registerForm.value).subscribe(
       data => {
         console.log(data)
        
         this.loading = true;
         this.router.navigateByUrl('/login');
         // this.login(this.registerForm.value);
       },
       error => {
         console.log(error)
         this.error=true 
         this.msgerror=error.error;
         
          
         this.loading = false;
       });
 }

 login(user) {
   this.authenticationService.login(user).subscribe(data => {
       const jwt = data as JwtResponse;
       this.authenticationService.saveToken(jwt.token);
       this.router.navigate(['/']);
     },
     error => {
      console.log(error);
     });
 }

}
