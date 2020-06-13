import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url= 'http://localhost:3000/api/category'
  constructor(private http  : HttpClient) { }
  getAllCategories(){
    return this.http.get(this.url+'/list')
  }

  saveCategory(cat){
    console.log(cat);
return this.http.post(this.url+'/add',{'name' :cat});

  }
  saveSubCategory(cat,subcat){
    return this.http.post(this.url+'/'+cat,subcat)
  }
  getSubCategories(){
    return this.http.get(this.url+'/sublist')
  }
  edit(sub,cat){
    return this.http.post(this.url+'/'+cat,sub)

  }
  delete(cat){
    return this.http.delete(this.url+'/'+cat)

  }
  getSubCategoriesByCategory(cat){
    return this.http.get(this.url+'/getsub/'+cat)
  }
}
