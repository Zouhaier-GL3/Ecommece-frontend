import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  selectedId: number;
  selectedProduct ;
  relatedProducts : []
  constructor(private route: ActivatedRoute,private proService : ProductService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.getDetailsProduct(id) ;
  }
getDetailsProduct(id){
this.proService.getbyId(id).subscribe(data=>{
  console.log(data)
  this.selectedProduct=data ;
},err=> console.log(err))
}
getRelatedProduct(subcat){
  this.proService.getRelatedPro(subcat).subscribe(data=> {
    this.relatedProducts=data as []
  })
}
addToCart(){
  
}
}
