import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isSuperAdmin;
  isSeller ;
  isAdmin ;
constructor(private authService: AuthenticationService) { }

ngOnInit() {
this.isSuperAdmin = this.authService.isSuperAdmin();
this.isSeller=this.authService.isSeller();
this.isAdmin=this.authService.isAdmin()
}

}
