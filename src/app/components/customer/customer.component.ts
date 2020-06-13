import { Component, OnInit } from '@angular/core';

import { CustomerService } from '../../services/customer.service';
import { NgForm } from '@angular/forms';
import { Customer } from '../../models/customer';

declare var M: any;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [ CustomerService ]
})
export class CustomerComponent implements OnInit {

  customer
  addform = false
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(data=>
      this.customer=data

    )};

  addcustomer(form?: NgForm) {
    console.log(form.value);
    if(form.value._id) {
      this.customerService.putCustomer(form.value)
        .subscribe(res => {

          this.resetForm(form);
          this.getcustomers();
          M.toast({html: 'Updated Successfully'});
          this.addform=false
        });
    } else {
      this.customerService.postCustomer(form.value)
      .subscribe(res => {
        this.addform=false
        this.getcustomers();
        this.resetForm(form);
        M.toast({html: 'Save successfully'});
      });
    }

  }

  getcustomers() {
    this.customerService.getCustomers()
      .subscribe(res => {
        this.customerService.Customers = res as Customer[];
      });
  }

  editcustomer(customer: Customer) {
    this.customerService.selectedCustomer = customer;
  }

  deletecustomer(_id: string) {
    console.log(_id)
    if(confirm('Are you sure you want to delete it?')){
      this.customerService.deleteCustomer(_id)
        .subscribe(res => {
          console.log(res)
          this.customerService.getCustomers().subscribe(data=>
            this.customer=data

          )
           M.toast({html: 'Deleted Succesfully'});
        },err => {
          console.log(err)
        });
    }
  }
  showaddForm(){
    this.addform=true
  }
  resetForm(form) {
    if (form) {
      form.reset();
      this.customerService.selectedCustomer = new Customer();
    }
  }

}
