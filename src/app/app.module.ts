import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from './app.router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ClientService } from './client.service';
import { UserService } from './user.service';
import { AppointmentService } from './appointment.service';

import { LoginComponent, AppComponent } from './login/login.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { UsersComponent } from './users/users.component';
import { AddUpdateClientComponent } from './add-update-client/add-update-client.component';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';


@NgModule({
  declarations: [
    LoginComponent,
    AppointmentsComponent,
    UsersComponent,
    AddUpdateClientComponent,
    UpdateAppointmentComponent,
    AddUpdateUserComponent,
    AddAppointmentComponent,
    AppComponent,
    ConfirmationComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [ClientService, UserService, AppointmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
