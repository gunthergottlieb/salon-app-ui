import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import _ from 'lodash';



import { ClientService } from '../client.service'
import { UserService } from '../user.service'
import { AppUser } from '../app-user'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  Stylists: AppUser[];


  constructor(
  private clientService: ClientService,
  private userService:UserService,
  private router: Router
  ) { }

  createStylist(): void {
  this.userService.selectedUser.realm = "notUpdate";
  this.router.navigate(['/updateuser']);
  }


  ngOnInit() {
    if(!this.userService.isUserLoggedIn) {this.router.navigate(['']);}
    this.listStylists();
    this.userService.selectedUser.realm = "notUpdate";
  }

  onUserSelect(stylist) {
  this.userService.selectedUser = stylist;
  this.router.navigate(['/updateuser']);
  }



  listStylists(): void {

  this.userService.getStylists().then(res => {
  this.Stylists = res.json().stylists;
  this.Stylists= _.sortBy(this.Stylists, ['username']);
  });

  }

}
