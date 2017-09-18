import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppUser } from './app-user'
import { AppointmentModel } from './appointment'


import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppointmentService {

private appointmentUrl = 'http://localhost:3000/api/Appointments';
public selectedAppointment: AppointmentModel = {time: [''],
date: '',
client: '',
clientName: '',
stylist: '',
stylistName: '',
id: '',
appointmentType: ''};
private headers = new Headers({'Content-Type': 'application/json'});

constructor(private http: Http) { }

getAppointmentsByClient(clientId): Promise <any> {
const url = `${this.appointmentUrl}?filter=${JSON.stringify({"where": {"client": clientId}})}`;
return this.http
  .get(url)
  .toPromise()
  .then(response => response)
  .catch(this.handleError);

}

getAppointmentsByStylist(stylistId): Promise <any> {
const url = `${this.appointmentUrl}?filter=${JSON.stringify({"where": {"stylist": stylistId}})}`;
return this.http
  .get(url)
  .toPromise()
  .then(response => response)
  .catch(this.handleError);
}

getUnavailable(date,times): Promise <any> {
const url = `${this.appointmentUrl}?filter=${JSON.stringify({"where": {"and": [{"date":date},{"time": {"inq": times}}]}})}`;
return this.http
  .get(url)
  .toPromise()
  .then(response => response)
  .catch(this.handleError);
}

createAppointment(client,user,date,times): Promise <any> {
const url = `${this.appointmentUrl}`;
return this.http
  .post(url,JSON.stringify({
  "time":times,
  "date":date,
  "client":client.id,
  "clientName":client.firstName + ' ' + client.lastName,
  "stylist":user.id,
  "stylistName": user.firstName + ' ' + user.lastName
  }), {headers: this.headers} )
  .toPromise()
  .then(() => {})
  .catch(this.handleError);
}
deleteAppointment(appointmentId): Promise<any> {
const url = `${this.appointmentUrl}/${appointmentId}`
return this.http.delete(url).toPromise().then(() =>{}).catch(this.handleError);
}

private handleError(error: any): Promise <any> {
  console.error('An error occurred', error);
  return Promise.reject(error.message || error);
}

}
