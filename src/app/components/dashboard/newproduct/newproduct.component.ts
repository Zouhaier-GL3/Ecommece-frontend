import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.scss']
})
export class NewproductComponent implements OnInit {


  productform: FormGroup;
  submitted = false;
   message;
   imgURL3 ;
   imgURL2 ;
   imgURL1 ;
   categories =[];
   subCatgories: any;
 private annonce ;
 private images: [string];
   showLocation = false;
   showEchange = false;
   currentUser : null ;

constructor(
   private formBuilder: FormBuilder,
   private router: Router,
   private catService: CategoryService,
   private annonceService: ProductService,
   private authService: AuthenticationService,
 ) {}


 ngOnInit() {
 this.currentUser=  this.authService.getUsername();
 console.log(this.currentUser)
    this.getCategories();
   this.productform = this.formBuilder.group({
     seller_id: this.currentUser,
     image1: [Validators.required],
     image2: [],
     image3: [],
     name: ['', Validators.required],
     barcode: ['', Validators.required],
     description: ['', Validators.required],
     categorie: ['', Validators.required],
     subcategory: ['', Validators.required],
      couleurs : [] ,
     prix: ['',Validators.required],
     quantite: [''],
     modele : ['']

   });

 }

 get f() {
   return this.productform.controls;
 }


 onSaveAnnonnce() {
   this.submitted = true;
   if (this.productform.invalid )  {
     console.log('error'+this.productform.controls );
     return;
   }
   if (!this.productform.value.image1 && !this.productform.value.image2 && !this.productform.value.image2 ) {
     console.log('imgerr');
     return;
   }

   console.log(this.productform.value);

   this.annonceService.saveProduct(this.productform.value).subscribe(
     data => {
       console.log(data);
       this.router.navigate(['/productlist']);
     },
     error => {
       console.log(error);
     });

 }




 getCategories() {
   this.catService.getAllCategories().subscribe(data => {
     console.log(data)
     this.categories = data as [];
   }, err => {
     console.log(err);
   });
 }

 getSubCategories(cat) {
  console.log(cat)

 this.catService.getSubCategoriesByCategory(cat).subscribe(data => {
   console.log(data)
    this.subCatgories=data
 });
 }


 preview1(files) {
   if (files.length === 0) {
     return;
   }
   const currentFileUpload = files.item(0);
   const fileReader = new FileReader();
   fileReader.onload = this._handleReaderLoaded.bind(this);
   fileReader.readAsBinaryString(currentFileUpload);
 }

 _handleReaderLoaded(readerEvt) {
   const binaryString = readerEvt.target.result;
   const filestring = btoa(binaryString);  // Converting binary string data.
   this.productform.patchValue({
     image1: filestring ,
   });
   this.imgURL1 = filestring ;
 }


 preview2(files) {
   if (files.length === 0) {
     return;
   }
   const currentFileUpload = files.item(0);
   const fileReader = new FileReader();
   fileReader.onload = this._handleReaderLoaded2.bind(this);
   fileReader.readAsBinaryString(currentFileUpload);
 }
 _handleReaderLoaded2(readerEvt) {
   const binaryString = readerEvt.target.result;
   const filestring = btoa(binaryString);  // Converting binary string data.
   this.productform.patchValue({
     image2: filestring ,
   });
   this.imgURL2 = filestring ;
 }

 preview3(files) {
   if (files.length === 0) {
     return;
   }
   const currentFileUpload = files.item(0);
   const fileReader = new FileReader();
   fileReader.onload = this._handleReaderLoaded3.bind(this);
   fileReader.readAsBinaryString(currentFileUpload);
 }
 _handleReaderLoaded3(readerEvt) {
   const binaryString = readerEvt.target.result;
   const filestring = btoa(binaryString);  // Converting binary string data.
   this.productform.patchValue({
     image3: filestring ,
   });
   this.imgURL3 = filestring ;
 }

 onShowEchange(event) {
  this.showEchange = !this.showEchange;
 }


 onShowLocation(event) {
   this.showLocation = !this.showLocation;
 }
}
