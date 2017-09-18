import { Component, OnInit } from '@angular/core';
import { AppUser } from '../app-user';
import { UserService } from '../user.service';
import { ClientService } from '../client.service';
import { AppointmentService } from '../appointment.service';
import { Router, RouterModule, Routes } from '@angular/router';
import _ from 'lodash';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {



  Stylists: AppUser[];
  Clients: AppUser[];
  isClient: Boolean;
  isStylist: Boolean;
  stylistFound: Boolean = true;
  clientFound: Boolean = true;
  isTimeValid: Boolean = true;
  isInputValid: Boolean = true;
  userSelected: Boolean = false;
  selectedTimes: string[];
  selectedDate: string;
  selectedUser: AppUser;

  constructor(private userService: UserService,
  private clientService: ClientService,
  private appointmentService: AppointmentService,
  private router: Router) { }

  ngOnInit() {
  this.isClient = this.clientService.isClientLoggedIn;
  this.isStylist = this.userService.isUserLoggedIn;
  if(!this.isClient && !this.isStylist) {this.router.navigate(['']);}
  }

  validateDate(date): boolean {
    let dateArr: string[] = _.split(date,'/',3);
    console.log(dateArr);
    let today = new Date();
    console.log(today.getFullYear(), today.getMonth() + 1, today.getDate())
    if(date.length !== 10) {
    return false;
    }
    if(_.size(dateArr) !== 3){
    return false;
    }

    if((parseInt(_.nth(dateArr,2)) < today.getFullYear()) ||
      ((parseInt(_.nth(dateArr,2)) == today.getFullYear()) && (parseInt(_.nth(dateArr,0)) < (today.getMonth() + 1))) ||
      ((parseInt(_.nth(dateArr,2)) == today.getFullYear()) && (parseInt(_.nth(dateArr,0)) == (today.getMonth() + 1)) && (parseInt(_.nth(dateArr,1)) <= (today.getDate())))
      ){

    return false;

    }
    if(parseInt(_.nth(dateArr,0)) > 12 || parseInt(_.nth(dateArr,1)) > 31 ||
    parseInt(_.nth(dateArr,1)) < 1 || parseInt(_.nth(dateArr,0)) < 1){ return false; }
    return true;
  }


  checkAvalibilityClient(date,hour,minute,meridiem,appointmentType) {

    this.Stylists = [];
    this.isTimeValid = true;
    this.isInputValid = true;

    if(!this.validateDate(date)){
    this.isInputValid = false;
    return;
    }


    let invalidStylistIdList: string[] = [];
    let invalidClientIdList: string[] = [];
    let allStylistIdList: string[] = [];
    let validStylistIdList: string[] = [];
    let times: string[] = [];

    if(hour === "12" && meridiem === "AM"){hour = "00";}
    else if(meridiem === "PM" && hour !== "12"){hour = parseInt(hour) + 12;}


    if(appointmentType === "1") {times = [hour + ':' + minute]}
    if(appointmentType === "2") {
      times = [hour + ':' + minute]
      if(parseInt(minute) + 15 > 45) {
      if (parseInt(hour) + 1 < 10) {
      hour = parseInt(hour) + 1;
      hour = '0' + hour;
      } else {hour = parseInt(hour) + 1}
      minute = "00";
      } else {minute = parseInt(minute) + 15;}
      times = _.concat(times, hour + ':' + minute);
    }
    if(appointmentType === "3") {
    times = [hour + ':' + minute]
    if(parseInt(minute) + 15 > 45) {
    if (parseInt(hour) + 1 < 10) {
    hour = parseInt(hour) + 1;
    hour = '0' + hour;
    } else {hour = parseInt(hour) + 1}
    minute = "00";
    } else {minute = parseInt(minute) + 15;}
    times = _.concat(times, hour + ':' + minute);
    if(parseInt(minute) + 15 > 45) {
    if (parseInt(hour) + 1 < 10) {
    hour = parseInt(hour) + 1;
    hour = '0' + hour;
    } else {hour = parseInt(hour) + 1}
    minute = "00";
    } else {minute = parseInt(minute) + 15;}
    times = _.concat(times, hour + ':' + minute);
    }

    this.selectedDate = date;
    this.selectedTimes = times;

    this.appointmentService.getUnavailable(date,times)
      .then(unavailable => {

        _.forEach(unavailable.json(), function(unavailStylistId) {
          invalidStylistIdList = _.concat(invalidStylistIdList, unavailStylistId.stylist)
        });
        _.forEach(unavailable.json(), function(unavailClientId) {
          invalidClientIdList = _.concat(invalidClientIdList, unavailClientId.client)
        })

        this.userService.getStylists().then(allStylists => {
          _.forEach(allStylists.json().stylists, function(allStylistId) {
            allStylistIdList = _.concat(allStylistIdList, allStylistId.id)
          });

          if(_.indexOf(invalidClientIdList, this.clientService.clientId) !== -1) {
          this.isTimeValid = false;
          return;
          }

          validStylistIdList = _.difference(allStylistIdList, invalidStylistIdList);


          this.userService.getStylistsByIds(validStylistIdList).then(res => {
          console.log(res.json())
            this.Stylists = res.json();
            console.log(this.Stylists);
            if(_.size(this.Stylists) < 1) {this.stylistFound = false;}
            else {this.stylistFound = true;}
          });
        });
      });
  }

  checkAvalibilityStylist(date,hour,minute,meridiem,appointmentType) {

    this.Clients = [];
    this.isTimeValid = true;
    this.isInputValid = true;
    this.userSelected = false;

    if(!this.validateDate(date)){
    this.isInputValid = false;
    return;
    }


    let invalidStylistIdList: string[] = [];
    let invalidClientIdList: string[] = [];
    let allClientIdList: string[] = [];
    let validClientIdList: string[] = [];
    let times: string[] = [];

    if(hour === "12" && meridiem === "AM"){hour = "00";}
    else if(meridiem === "PM" && hour !== "12"){hour = parseInt(hour) + 12;}


    if(appointmentType === "1") {times = [hour + ':' + minute]}
    if(appointmentType === "2") {
      times = [hour + ':' + minute]
      if(parseInt(minute) + 15 > 45) {
      if (parseInt(hour) + 1 < 10) {
      hour = parseInt(hour) + 1;
      hour = '0' + hour;
      } else {hour = parseInt(hour) + 1}
      minute = "00";
      } else {minute = parseInt(minute) + 15;}
      times = _.concat(times, hour + ':' + minute);
    }
    if(appointmentType === "3") {
    times = [hour + ':' + minute]
    if(parseInt(minute) + 15 > 45) {
    if (parseInt(hour) + 1 < 10) {
    hour = parseInt(hour) + 1;
    hour = '0' + hour;
    } else {hour = parseInt(hour) + 1}
    minute = "00";
    } else {minute = parseInt(minute) + 15;}
    times = _.concat(times, hour + ':' + minute);
    if(parseInt(minute) + 15 > 45) {
    if (parseInt(hour) + 1 < 10) {
    hour = parseInt(hour) + 1;
    hour = '0' + hour;
    } else {hour = parseInt(hour) + 1}
    minute = "00";
    } else {minute = parseInt(minute) + 15;}
    times = _.concat(times, hour + ':' + minute);
    }

    this.selectedDate = date;
    this.selectedTimes = times;

    this.appointmentService.getUnavailable(date,times)
      .then(unavailable => {

        _.forEach(unavailable.json(), function(unavailStylistId) {
          invalidStylistIdList = _.concat(invalidStylistIdList, unavailStylistId.stylist)
        });
        _.forEach(unavailable.json(), function(unavailClientId) {
          invalidClientIdList = _.concat(invalidClientIdList, unavailClientId.client)
        })

        this.clientService.getClients().then(allClients => {
          console.log(allClients.json());
          _.forEach(allClients.json(), function(allClientsId) {
            allClientIdList = _.concat(allClientIdList, allClientsId.id)
          });

          if(_.indexOf(invalidStylistIdList, this.userService.userId) !== -1) {
          this.isTimeValid = false;
          return;
          }

          validClientIdList = _.difference(allClientIdList, invalidClientIdList);


          this.clientService.getClientsByIds(validClientIdList).then(res => {
            this.Clients = res.json();
            if(_.size(this.Clients) < 1) {this.clientFound = false;}
            else {this.clientFound = true;}
          });
        });
      });
  }

  onStylistSelect(stylist) {
  this.userService.selectedUser = stylist;
  this.selectedUser = stylist;
  this.userSelected = true;
  }
  onClientSelect(client) {
  this.clientService.selectedUser = client;
  this.selectedUser = client;
  this.userSelected = true;
  }

  bookAppointment() {
    if(this.isClient) {
    this.clientService.getClientById(this.clientService.clientId).then(client => {
    this.userService.getStylistById(this.userService.selectedUser.id).then(stylist => {
    this.appointmentService.createAppointment(client.json(),stylist.json(),this.selectedDate,this.selectedTimes).then( res => {
    this.router.navigate(['/confirmation']);
    });
    });
    });

    }
    if(this.isStylist) {
    this.clientService.getClientById(this.clientService.selectedUser.id).then(client => {
    this.userService.getStylistById(this.userService.userId).then(stylist => {
    this.appointmentService.createAppointment(client.json(),stylist.json(),this.selectedDate,this.selectedTimes).then( res => {
    this.router.navigate(['/confirmation']);
    });
    });
    });
    }
  }


}
