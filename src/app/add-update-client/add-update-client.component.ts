import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { ClientService } from '../client.service';
import { AppUser } from '../app-user';
import { NgModel, NgForm} from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../login/login.component';
import { AppointmentService } from '../appointment.service';
import _ from 'lodash';



@Component({
  selector: 'app-add-update-client',
  templateUrl: './add-update-client.component.html',
  styleUrls: ['./add-update-client.component.css']
})
export class AddUpdateClientComponent implements OnInit {

  constructor(private clientService:  ClientService,
  private router: Router,
  private appComponent: AppComponent,
  private appointmentService: AppointmentService
  ) { }

  loggedIn: boolean;
  user: AppUser;
  first: string ='';
  last: string ='';
  email: string='';
  username: string='';

  getClient(): void {
    this.clientService.getClient().then( res => {
    this.first = res.json().firstName;
    this.last = res.json().lastName;
    this.email = res.json().email;
    this.username = res.json().username;
    })
  }

  ngOnInit(): void {
  this.loggedIn = this.clientService.isClientLoggedIn;
  if(this.loggedIn) {this.getClient();}

  }

  onSubmit(f: NgForm): void {
  if (!f.value.first || !f.value.last || !f.value.username || !f.value.email || !f.value.password) {return;}
  console.log(f.value.first, f.value.last, f.value.username, f.value.email, f.value.password);
  if (!this.loggedIn) {
    this.clientService.createClient(f.value.first, f.value.last, f.value.username, f.value.email, f.value.password);
    this.router.navigate(['/login']);
  } else {
    this.clientService.updateClient(f.value.first, f.value.last, f.value.username, f.value.email, f.value.password);
    this.router.navigate(['/appointments']);
  }
  }

  cancelChanges(): void {
  this.router.navigate(['/appointments']);
  }

  deleteAccount(): void {
  this.appointmentService.getAppointmentsByClient(this.clientService.clientId).then( res => {
  _.forEach(res.json(), appointment => {
  this.appointmentService.deleteAppointment(appointment.id);
  });
  });
  this.clientService.deleteClient();
  this.appComponent.logout();
  }

}
