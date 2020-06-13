import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-vendeurrequest',
  templateUrl: './vendeurrequest.component.html',
  styleUrls: ['./vendeurrequest.component.scss']
})
export class VendeurrequestComponent implements OnInit {
  listDemande =[] ;
  dtOptions: DataTables.Settings = {};
   // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<Product> = new Subject();

  constructor(private prodService : ProductService,private authServ :AuthenticationService,private custService : CustomerService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.custService.getDemandeVente()
     
      .subscribe(data => {
        this.listDemande = data as [];
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
