import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service'
import { AppointmentModel } from'../appointment'
import { Router, RouterModule, Routes } from '@angular/router';
import _ from 'lodash';



@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.css']
})
export class UpdateAppointmentComponent implements OnInit {
  appointment: AppointmentModel;
  duration: string;

  constructor(private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit() {
  this.appointment = this.appointmentService.selectedAppointment;
  this.duration = (_.size(this.appointment.time) * 15) + " minutes";
  }

  deleteAppointment() {
    this.appointmentService.deleteAppointment(this.appointmentService.selectedAppointment.id).then(() => {
    this.router.navigate(['/appointments']);
    });
  }

  goBack() {
  this.router.navigate(['/appointments']);
  }

}
