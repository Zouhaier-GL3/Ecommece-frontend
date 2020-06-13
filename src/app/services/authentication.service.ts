import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url = 'http://localhost:3000'
  token = localStorage.getItem('token')
  role= [];
  constructor(private http: HttpClient) {
  
    this.token = localStorage.getItem('token')
    if(this.token!=null){
    this.role=helper.decodeToken(this.token).roles
    console.log(helper.decodeToken(this.token))
   }
  }


getToken(){
  if(this.token==null)
  this.token=localStorage.getItem('token')
}
  getUsername() {
    return helper.decodeToken(this.token)._id
  }
  isUser() {
   this.getToken()
   if(this.token!=null)
    return helper.decodeToken(this.token).roles.includes('user')
    else 
    return false ;
  }
  logout() {
    localStorage.removeItem('token')
    this.token = null
    this.role=[]
  }
  isSuperAdmin() {
    this.getToken()
   
    if (this.token == null)
      return false;
    return this.role.includes('superadmin')
  }
  isAuthenticated() {
    return localStorage.getItem('token') != null;
  }
  login(info) {
    return this.http.post(this.url + '/api/users/authenticate', info);
  }
  saveToken(jwt) {
    this.token = jwt;
    localStorage.setItem('token', jwt)
  }
  isAdmin() {
    this.getToken()
   
    this.getToken()
   
    if (this.token == null)
      return false;
    return this.role.includes('admin')
  }
  isSeller() {
    this.getToken()
   
    if (this.token == null)
      return false;
    return this.role.includes('seller')
  }
  roles() {
    this.getToken()
    if (this.token != null)
      return this.role
    return []
  }
}
