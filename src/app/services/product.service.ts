import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url ='http://localhost:3000/api/product'
  constructor(private http : HttpClient) { }

  saveProduct(product){
    console.log(product)
     
    return this.http.post(this.url+'/upload' ,product) ;
  }
  listproduct(){
    return this.http.get(this.url+'/list') ;
  }
  getbyId(id){
    return this.http.get(this.url+'/'+id) ;
  }
  getRelatedPro(subcat){
    return this.http.get(this.url+'/related/bysub/'+subcat) ;
  }
  getRelatedProByCat(cat){
    return this.http.get(this.url+'/related/bycat/'+cat) ;
  }
  getBySeller(id){
    console.log("get prod by seller"+id)
  return   this.http.get(this.url+'/myproducts/'+id)
  }
  getProdEnPub(){
    console.log("get prod en Pub")
  return   this.http.get(this.url+'/enpub')
  }

}
