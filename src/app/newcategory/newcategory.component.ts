import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-newcategory',
  templateUrl: './newcategory.component.html',
  styleUrls: ['./newcategory.component.css']
})
 export class NewcategoryComponent implements OnInit {


 public categoryform: FormGroup;
  submitted = false;


   subCatgories: any;
   showLocation = false;
   showEchange = false;
   currentUser : null ;

constructor(
   private formBuilder: FormBuilder,
   private router: Router,
   private catService: CategoryService,
   private annonceService: CategoryService,
   private authService: AuthenticationService,
 ) {
   this.categoryform = this.formBuilder.group({
     label: ['', Validators.required]
   });
 }


 ngOnInit() {
 this.currentUser=  this.authService.getUsername();
 console.log(this.currentUser)

   /* this.categoryform = this.formBuilder.group({
     seller_id: this.currentUser,


   }); */

 }

 /* get f() {
   return this.categoryform.controls;
 } */

saveCategory(){
  console.log("lalal");
  console.log(this.categoryform.value.label);
  this.catService.saveCategory(this.categoryform.value.label).subscribe(
    res=> console.log(res)
  );
}
//  saveCategory() {
//    this.submitted = true;
//    if (this.categoryform.invalid )  {
//      console.log('error'+this.categoryform.controls );
//      return;
//    }
//    if (!this.categoryform.value.image1 && !this.categoryform.value.image2 && !this.categoryform.value.image2 ) {
//      console.log('imgerr');
//      return;
//    }

//    console.log(this.categoryform.value);

//    this.annonceService.saveCategory(this.categoryform.value).subscribe(
//      data => {
//        console.log(data);
//        this.router.navigate(['/categorylist']);
//      },
//      error => {
//        console.log(error);
//      });

//  }

 getSubCategories(cat) {
  console.log(cat)

 this.catService.getSubCategoriesByCategory(cat).subscribe(data => {
   console.log(data)
    this.subCatgories=data
 });
 }



 onShowEchange(event) {
  this.showEchange = !this.showEchange;
 }


 onShowLocation(event) {
   this.showLocation = !this.showLocation;
 }
}

