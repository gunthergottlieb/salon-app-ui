import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { AppUser } from '../app-user';
import { NgModel, NgForm} from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../login/login.component';
import { AppointmentService } from '../appointment.service';
import _ from 'lodash';


@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.css']
})
export class AddUpdateUserComponent implements OnInit {

  constructor(private userService:  UserService,
    private router: Router,
    private appComponent: AppComponent,
    private appointmentService: AppointmentService
    ) { }

  isUpdate: boolean = false;
  User: AppUser;
  first: string ='';
  last: string ='';
  email: string='';
  username: string='';

  onSubmit(f: NgForm): void {
  if (!f.value.first || !f.value.last || !f.value.username || !f.value.email || !f.value.password) {return;}
  console.log(f.value.first, f.value.last, f.value.username, f.value.email, f.value.password);
  if (!this.isUpdate) {
    this.userService.createUser(f.value.first, f.value.last, f.value.username, f.value.email, f.value.password).then(() => {
    this.router.navigate(['/users']);
    })
  } else {
    this.userService.updateUser(this.User.id,f.value.first, f.value.last, f.value.username, f.value.email, f.value.password).then(() => {
    this.router.navigate(['/users']);
    })
  }
  }

  getUser(): void {
    this.User = this.userService.selectedUser;
    this.first = this.User.firstName;
    this.last = this.User.lastName;
    this.email = this.User.email;
    this.username = this.User.username;
    this.userService.selectedUser.realm = "notUpdate";
  }

  cancelChanges(): void {
  this.router.navigate(['/users']);
  }

  deleteAccount(): void {
  this.appointmentService.getAppointmentsByStylist(this.User.id).then( res => {
  _.forEach(res.json(), appointment => {
  this.appointmentService.deleteAppointment(appointment.id);
  });
  });
  if(this.User.id === this.userService.userId ){
  this.userService.deleteUser(this.User.id).then(res => {
  this.appComponent.logout();
  })
  }else{
  this.userService.deleteUser(this.User.id);
  this.router.navigate(['/users']);
  }
  }

  ngOnInit() {
  console.log(this.userService.selectedUser.realm);
  if(this.userService.selectedUser.realm === "notUpdate"){
    this.isUpdate = false;
    } else {
    this.isUpdate = true;
    this.getUser();
    }
  if(!this.userService.isUserLoggedIn){this.router.navigate(['']);}
  }

}
