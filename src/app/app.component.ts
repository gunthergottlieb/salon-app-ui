import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';


import { ClientService } from './client.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public loggedIn: boolean = false;
  loggedInClient: boolean = false;
  loggedInStylist: boolean = false;

  constructor(
  private clientService:  ClientService,
  private userService: UserService,
  private router: Router

   ) { }

  logout(): void {
    this.clientService.logout();
    this.userService.logout();
    this.loggedIn = false;
    this.loggedInClient = false;
    this.loggedInStylist = false;
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  this.loggedIn = false;
  this.loggedInClient = false;
  this.loggedInStylist = false;
  }

  loginStylist(): void {
    this.loggedIn = true;
    this.loggedInStylist = true;
  }

  loginClient(): void {
    this.loggedIn = true;
    this.loggedInClient = true;
  }

  public updateStatus() {
   if(this.clientService.isClientLoggedIn){
   this.loginClient();
   }
   if(this.userService.isUserLoggedIn){
   this.loginStylist();
   }
  }


}

export { ClientService } from './client.service';
