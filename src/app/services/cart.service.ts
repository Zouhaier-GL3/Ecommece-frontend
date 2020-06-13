import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class CartService {

 
  cart: any;
  favories : any ;
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cart')) //Object.values() ;
    if (this.cart == null)
      this.cart = []
      this.favories=JSON.parse(localStorage.getItem('favories')) //Object.values() ;
      if(this.favories==null)
      this.favories=[]
  }
  getCartItems(){
    return this.cart ;
  }
  addProductToCart(item) {
    item.quantite=1 ;
    this.cart.push(item)
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  removeItemFromCart(item) {
    const index = this.cart.findIndex(i => i._id == item._id)
    if (index > -1) { this.cart.splice(index, 1) }
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  updateItemQuant(item, qte) {
    const index = this.cart.findIndex(i => i._id == item._id)
    if (index > -1)
     {
      this.cart[index].quantite = qte;
      localStorage.setItem('cart', JSON.stringify(this.cart));
     }
    else {
      this.cart.push(Object.assign({}, item));
    }
  }
isInCart(item){
  const index = this.cart.findIndex(i => i._id == item)
  if(index> -1)
  return true 
  else 
  return false  ;

}

  addProductToFav(item){
this.favories.push(item)
localStorage.setItem('favories', JSON.stringify(this.favories));
  }
}
