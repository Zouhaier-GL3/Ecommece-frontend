import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  user;
   annonces ;


  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
   ) {
  }

  ngOnInit() {
    this.getAbonne();
  }


  getAbonne() {
    const username = this.activatedRoute.snapshot.paramMap.get('username');
    this.userService.getUserByUsername(username).subscribe(data => {
      this.user = data ;
      console.log(data)
      this.getAnnonce();
    }, err => {
      console.log(err);
    });
  }
  getAnnonce() {
      console.log(this.annonces);
  }


}
