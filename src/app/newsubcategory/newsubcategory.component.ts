import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-newsubcategory',
  templateUrl: './newsubcategory.component.html',
  styleUrls: ['./newsubcategory.component.css']
})
export class NewsubcategoryComponent implements OnInit {

    public subcategoryform: FormGroup;
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
      //this.subcategoryform = this.formBuilder.group({
     //   labeln: ['', Validators.required]
     // });
    }


    ngOnInit() {
    this.currentUser=  this.authService.getUsername();
    console.log(this.currentUser)



    }



   saveSubCategory(){
     console.log("lalal");
     console.log(this.subcategoryform.value.label);
     this.catService.saveCategory(this.subcategoryform.value.label).subscribe(
       res=> console.log(res)
     );
   }


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

