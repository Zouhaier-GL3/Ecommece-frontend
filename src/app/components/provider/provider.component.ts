import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  requestFrom : FormGroup ;
  constructor( private formBuilder: FormBuilder,
    private router: Router,private customService : CustomerService) { }

  ngOnInit(): void {
    this.requestFrom=this.formBuilder.group({
      name : ['',Validators.required],
      message : ['',Validators.required],
      Telephone : ['',Validators.required],
      email :['',Validators.required],
      adresse :[''],
      catégoie_produit : ['',Validators.required],

    }) ;
  }
  saveRequest(){
    this.customService.postDemande(this.requestFrom.value).subscribe(data=>{
      console.log(data)
      this.router.navigateByUrl('/home')
    },err=> console.log(err))
  }

}
