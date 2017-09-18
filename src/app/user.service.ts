import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppUser } from './app-user'


import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  private userUrl = 'http://localhost:3000/api/Stylists';
  public selectedUser: AppUser = {firstName:'',lastName:'',username:'',email: '', realm: '', emailVerified: false, id: ''}
  private headers = new Headers({'Content-Type': 'application/json'});
  public accessToken = '';
  public userId = '';
  public isUserLoggedIn: boolean = false;

  constructor(private http: Http) { }

  login (password: string, username: string): Promise <any> {
    const url = `${this.userUrl}/login`;
    return this.http
      .post(url, JSON.stringify({"username": username, "password": password}), {headers: this.headers})
      .toPromise()
      .then(res => {
        this.accessToken = res.json().id;
        this.userId = res.json().userId;
        this.isUserLoggedIn = true;
        })
      .catch(this.handleError);
  }

  logout (): Promise <any> {
    const url = `${this.userUrl}/logout?access_token=${this.accessToken}`;
    return this.http
      .post(url, {}, {headers: this.headers})
      .toPromise()
      .then(()=> {
        this.accessToken = '';
        this.userId = '';
        this.isUserLoggedIn = false;
      })
      .catch(this.handleError);
  }

  getStylist(): Promise <any> {
  const url = `${this.userUrl}/${this.userId}?access_token=${this.accessToken}`
  return this.http
    .get(url)
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }

  getStylistById(userId): Promise <any> {
  const url = `${this.userUrl}/${userId}?access_token=${this.accessToken}`;
  return this.http
    .get(url)
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }

  getStylistsByIds(IdList): Promise <any> {
  const url = `${this.userUrl}?filter=${JSON.stringify({"where": {"id": {"inq": IdList}}})}`;
  return this.http
    .get(url)
    .toPromise()
    .then(response =>response)
    .catch(this.handleError);

  }

  getStylists(): Promise <any> {
  const url = `${this.userUrl}/list-stylists?access_token=${this.accessToken}`
  return this.http
    .get(url)
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }

  createUser(firstName: string, lastName: string, username: string, email: string, password: string): Promise <any> {
    const url = `${this.userUrl}`;
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
      .then(() => {})
      .catch(this.handleError);
  }

  updateUser(updateId: string, firstName: string, lastName: string, username: string, email: string, password: string): Promise <any> {
    const url = `${this.userUrl}/${updateId}?access_token=${this.accessToken}`;
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

  deleteUser(deletionUserId): Promise<any> {
  const url = `${this.userUrl}/${deletionUserId}?access_token=${this.accessToken}`
  return this.http.delete(url).toPromise().then(() =>{}).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
