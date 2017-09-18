import { Component, OnInit, Inject } from '@angular/core';
import { ClientService } from '../client.service';
import { UserService } from '../user.service';
import { AppComponent } from '../app.component';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
  private clientService: ClientService,
  public appComponent: AppComponent,
  private router: Router,
  private userService: UserService
  ) { }
  private userFail: boolean;
  private clientFail: boolean;
  private success: boolean;

  ngOnInit() {
  this.success = true;
  this.userFail = false;
  this.clientFail = false;
  }

  login(password: string, username: string): void {
  if (!password || !username) {return;}

  this.clientService.login(password, username).then(
  () => {
  if(this.clientService.isClientLoggedIn === true){
    this.appComponent.updateStatus();
    this.router.navigate(['/appointments']);
    return;
  }else{this.clientFail = true;}
  }).catch();

  this.userService.login(password,username).then(
  () => {
  if(this.userService.isUserLoggedIn === true){
  this.appComponent.updateStatus();
  this.router.navigate(['/appointments']);
  return;
  }else{this.userFail = true;}
  }).catch();

  if(this.userFail && this.clientFail){this.success = false}
  return;
  }

}


  export { AppComponent } from '../app.component';
