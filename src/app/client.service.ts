import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppUser } from './app-user'


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClientService {

  private clientUrl = 'http://localhost:3000/api/Clients';
  public selectedUser: AppUser = {firstName:'',lastName:'',username:'',email: '', realm: '', emailVerified: false, id: ''}
  private headers = new Headers({'Content-Type': 'application/json'});
  public accessToken = '';
  public clientId = '';
  public isClientLoggedIn: boolean = false;
  constructor(private http: Http) { }

  login (password: string, username: string): Promise <any> {
    const url = `${this.clientUrl}/login`;
    return this.http
      .post(url, JSON.stringify({"username": username, "password": password}), {headers: this.headers})
      .toPromise()
      .then(res => {
        this.accessToken = res.json().id;
        this.clientId = res.json().userId;
        this.isClientLoggedIn = true;
        })
      .catch(this.handleError);
  }

  logout (): Promise <any> {
    const url = `${this.clientUrl}/logout?access_token=${this.accessToken}`;
    return this.http
      .post(url, {}, {headers: this.headers})
      .toPromise()
      .then(()=> {
        this.accessToken = '';
        this.clientId = '';
        this.isClientLoggedIn = false;
      })
      .catch(this.handleError);
  }

  createClient(firstName: string, lastName: string, username: string, email: string, password: string): Promise <any> {
    const url = `${this.clientUrl}`;
    return this.http
      .post(url, JSON.stringify({
        "appointments": [],
        "firstName": firstName,
        "lastName": lastName,
        "realm": "clients",
        "username": username,
        "password": password,
        "email": email,
        "emailVerified": true}), {headers: this.headers})
      .toPromise()
      .then(() => {
        this.accessToken = '';
        this.clientId = '';
        this.isClientLoggedIn = false;
      })
      .catch(this.handleError);
  }

  updateClient(firstName: string, lastName: string, username: string, email: string, password: string): Promise <any> {
    const url = `${this.clientUrl}/${this.clientId}?access_token=${this.accessToken}`;
    return this.http
      .patch(url, JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "realm": "clients",
        "username": username,
        "password": password,
        "email": email,
        "emailVerified": true}), {headers: this.headers})
      .toPromise()
      .then(() => {})
      .catch(this.handleError);
  }

  getClient(): Promise <any> {
  const url = `${this.clientUrl}/${this.clientId}?access_token=${this.accessToken}`
  return this.http
    .get(url)
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }

  getClientById(clientId): Promise <any> {
  const url = `${this.clientUrl}/${clientId}?access_token=${this.accessToken}`
  return this.http
    .get(url)
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }


  getClients(): Promise <any> {
  const url = `${this.clientUrl}`
  return this.http
    .get(url)
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }

  getClientsByIds(IdList): Promise <any> {
  const url = `${this.clientUrl}?filter=${JSON.stringify({"where": {"id": {"inq": IdList}}})}`;
  return this.http
    .get(url)
    .toPromise()
    .then(response =>response)
    .catch(this.handleError);

  }

  deleteClient(): void {
  const url = `${this.clientUrl}/${this.clientId}?access_token=${this.accessToken}`
  this.http.delete(url).toPromise().then(() =>{}).catch(this.handleError);
  return;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
