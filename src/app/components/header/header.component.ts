import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, NavigationStart } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: [];
  Cartitems = [];
  cartItemTotal = 0;
  isAdmin = false;
  isSeller = false;
  isUser = false;
  constructor(private authService: AuthenticationService, private route: Router, private catSErvice: CategoryService, private cartService: CartService) {
    

     
  }

  ngOnInit(): void {
    this.getCategories()
    this.getCartItms()
    this.isAdminFun()
  }
  isAdminFun() {
    this.isAdmin = this.authService.isAdmin() || this.authService.isSuperAdmin() || this.roles().includes('seller')
    this.isSeller = this.isAuthenticated() && this.roles().includes('seller')
    this.isUser = this.authService.isUser() && !this.authService.isSeller()
  }

  isAuthenticated() {
    return this.authService.isAuthenticated()
  }
  NotAuthenticated() {
    return !this.authService.isAuthenticated()
  }
  logout() {
    this.isUser = false;
    this.isAdmin = false;
    this.isSeller = false;
    this.authService.logout()
    this.route.navigateByUrl('home')

  }
  roles() {
    return this.authService.roles();
  }
  getCategories() {
    this.catSErvice.getAllCategories().subscribe(data =>
      this.categories = data as [])
  }
  getCartItms() {
    this.Cartitems = this.cartService.getCartItems();
    console.log(this.Cartitems)
  }
  removeFromCart(item) {
    this.cartService.removeItemFromCart(item)
    this.getCartItms()
  }
}
