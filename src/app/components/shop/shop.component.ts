import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  listProd=[] ;
  listProdDd= [] ;
  productsPub = [] ;
  constructor(private prodService : ProductService,private cartService : CartService) { }

  ngOnInit(): void {
    this.prodService.listproduct()
      .subscribe(arg => {
        this.listProd= arg as []
    this.listProdDd= this.listProd.slice(5,9)
      });
    
  }

  addToCart(item){
    console.log(item)
    this.cartService.addProductToCart(item) ;
  }
  addToWishList(item){
    this.cartService.addProductToFav(item) ;
  }
  getProdEnPub(){
this.prodService.getProdEnPub().subscribe(data=> {
  this.productsPub=data as []
})
this.productsPub=this.listProd ;
  }

}
