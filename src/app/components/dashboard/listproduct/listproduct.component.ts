import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.scss']
})
export class ListproductComponent implements OnInit ,OnDestroy{
  listProd =[] ;
  dtOptions: DataTables.Settings = {};
   // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<Product> = new Subject();

  constructor(private prodService : ProductService,private authServ :AuthenticationService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.prodService.getBySeller(this.authServ.getUsername())
     
      .subscribe(data => {
        this.listProd = data as [];
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
