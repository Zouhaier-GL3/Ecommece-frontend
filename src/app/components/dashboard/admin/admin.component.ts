import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  listAdmins =[] ;
  dtOptions: DataTables.Settings = {};
   // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<Product> = new Subject();

  constructor(private userService : UserService,private authServ :AuthenticationService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.getlistAdmin();
  }
  suppAdmin(item){
    this.userService.deleteUser(item._id).subscribe(data=>{
      console.log(data)
      this.getlistAdmin()
    })
  }
  getlistAdmin(){
    this.userService.getAllAdmin()
     
      .subscribe(data => {
        this.listAdmins = data as [];
        console.log(data)
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
