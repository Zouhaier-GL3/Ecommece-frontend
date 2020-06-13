import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url='http://localhost:3000/api/users'
  constructor(private http : HttpClient) { }
  register(user){
    console.log(user)
    return this.http.post(this.url+'/',user) ;
  }
  getUserByUsername(username){
    return this.http.get(this.url+'/userProfile',{headers : {'authorization' : 'Bearer '+localStorage.getItem('token')}}) ;
  }
  deleteUser(id){
    return this.http.delete(this.url+'/'+id,{headers : {'authorization' : 'Bearer '+localStorage.getItem('token')}}) ;

  }
  getAllAdmin(){
    return this.http.get(this.url+'/admins',{headers : {'authorization' : 'Bearer '+localStorage.getItem('token')}}) ;

  }
  retirerAdmin(id){
    return this.http.get(this.url+'/'+id,{headers : {'authorization' : 'Bearer '+localStorage.getItem('token')}}) ;

  }
  ajouterAdmin(admin){
    return this.http.get(this.url+'/'+admin,{headers : {'authorization' : 'Bearer '+localStorage.getItem('token')}}) ;

  }
  getAllUsers(){
    return this.http.get(this.url+'/roleuser',{headers : {'authorization' : 'Bearer '+localStorage.getItem('token')}}) ;

  }
  getAllSeller(){
    return this.http.get(this.url+'/seller',{headers : {'authorization' : 'Bearer '+localStorage.getItem('token')}})
  }
}
