import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ClientService } from '../client.service';
import { AppointmentService } from '../appointment.service';
import { AppointmentModel } from '../appointment';
import { AppUser } from '../app-user'
import _ from 'lodash';
import { Router, RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  Appointments: AppointmentModel[];
  appointmentLength: string[];
  isClient: Boolean;
  isStylist: Boolean;

  constructor(
  private userService: UserService,
  private clientService: ClientService,
  private appointmentService: AppointmentService,
  private router: Router
  ) { }

  getClientAppointments(): void {
  this.isClient = true;
  this.appointmentService.getAppointmentsByClient(this.clientService.clientId).then( appointmentRes => {
  this.Appointments = appointmentRes.json();
  _.forEach(this.Appointments, appointment => {
    if(_.size(appointment.time) === 3) {appointment.appointmentType = "Permanent"}
    if(_.size(appointment.time) === 2) {appointment.appointmentType = "Coloring"}
    if(_.size(appointment.time) === 1) {appointment.appointmentType = "Haircut"}
  });
  this.Appointments = _.sortBy(this.Appointments, ['date','time[0]']);
  });
  }

  getUserAppointments(): void {
  this.isStylist = true;
  this.appointmentService.getAppointmentsByStylist(this.userService.userId).then( appointmentRes => {
  this.Appointments = appointmentRes.json();
  _.forEach(this.Appointments, appointment => {
    if(_.size(appointment.time) === 3) {appointment.appointmentType = "Permanent"}
    if(_.size(appointment.time) === 2) {appointment.appointmentType = "Coloring"}
    if(_.size(appointment.time) === 1) {appointment.appointmentType = "Haircut"}
  });
  this.Appointments = _.sortBy(this.Appointments, ['date','time[0]']);
  });
  }

  ngOnInit() {
  this.isClient = false;
  this.isStylist = false;
  if(this.clientService.isClientLoggedIn) {this.getClientAppointments();}
  else if(this.userService.isUserLoggedIn) {this.getUserAppointments();}
  else{this.router.navigate(['']);}
  }

  onUserSelect(appointment) {
    console.log(appointment);
    this.appointmentService.selectedAppointment = appointment;
    console.log(this.appointmentService.selectedAppointment);
    this.router.navigate(['/updateappointment']);
  }

}
