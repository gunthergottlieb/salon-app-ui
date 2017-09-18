import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { UsersComponent } from './users/users.component';
import { AddUpdateClientComponent } from './add-update-client/add-update-client.component';
import { LoginComponent } from './login/login.component';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'updateaccount', component: AddUpdateClientComponent },
    { path: 'updateappointment', component: UpdateAppointmentComponent },
    { path: 'updateuser', component: AddUpdateUserComponent },
    { path: 'createappointment', component: AddAppointmentComponent },
    { path: 'confirmation', component: ConfirmationComponent },
    { path: 'appointments', component: AppointmentsComponent },
    { path: 'users', component: UsersComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
