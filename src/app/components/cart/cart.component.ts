import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService : CartService) { }
 items ;
 totalAmount =0 ;
 shippingVal=0 ;
  ngOnInit(): void {
    this.items=this.cartService.getCartItems()
    this.updateTotal()
  }
  removeFromCart(item){
    this.cartService.removeItemFromCart(item)
    this.items=this.cartService.getCartItems()
   }
   updateTotal(){
     this.items.forEach(element => {
       this.totalAmount
       +=element.prix *element.quantite ;
     });
   }

   upQte(item){
    item.quantite=item.quantite+1
    this.cartService.updateItemQuant(item,item.quantite);
   }
   downQte(item){
    item.quantite=item.quantite-1
    this.cartService.updateItemQuant(item,item.quantite);
   }
}
