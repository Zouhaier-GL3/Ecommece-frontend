import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listProd=[] ;
  listProdDd= [] ;
  productsPub = [] ;
  constructor(private prodService : ProductService,private cartService : CartService) { }

  ngOnInit(): void {
    this.prodService.listproduct()
      .subscribe(arg => {
        this.listProd= arg as []
    this.listProdDd= this.listProd
    console.log(this.listProd.length +"ttt" +this.listProdDd.length)

      });

  }

  addtoCart(item){
    console.log(item)
    this.cartService.addProductToCart(item) ;
  }
  incart(item){
    return this.cartService.isInCart(item._id)
  }
  remFromCart(item){
    this.cartService.removeItemFromCart(item)
  }
  getProdEnPub(){
this.prodService.getProdEnPub().subscribe(data=> {
  this.productsPub=data as []
})
this.productsPub=this.listProd ;
  }
}
