import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';
import { MatRadioModule} from '@angular/material/radio';
import { MatCardModule} from '@angular/material/card';
import { MatNativeDateModule} from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LogoutComponent } from './components/logout/logout.component';
import { environment } from '../environments/environment';
import { registerMatchGuard } from './guards/register-match.guard';
import { registerActivateGuard } from './guards/register-activate.guard';

const routes: Routes = [
  {	path: '', pathMatch: 'full', redirectTo: '/' + environment.appConstants.routes.LOGIN },
  { path: environment.appConstants.routes.REGISTER, component: RegistrationComponent },
  { path: environment.appConstants.routes.LOGIN, component: LoginComponent },
  { path: environment.appConstants.routes.FGTPWD, component: ForgotPasswordComponent },
  { path: environment.appConstants.routes.LANDING.USER,
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canMatch: [registerMatchGuard],//alternative of canLoad
    canActivate: [registerActivateGuard]
  },
  { path: environment.appConstants.routes.LANDING.ADMIN,
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canMatch: [registerMatchGuard],//alternative of canLoad
    canActivate: [registerActivateGuard]
  },
  { path: environment.appConstants.routes.LOGOUT, component: LogoutComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    BrowserModule, BrowserAnimationsModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule.forRoot(routes), MatInputModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatNativeDateModule, MatDatepickerModule, MatRadioModule, MatProgressSpinnerModule
  ],
  exports: [
    BrowserModule, BrowserAnimationsModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, MatInputModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatNativeDateModule, MatDatepickerModule, MatRadioModule, MatProgressSpinnerModule
  ],
  declarations: [
    LoginComponent, RegistrationComponent, ForgotPasswordComponent, PageNotFoundComponent, LogoutComponent
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
})
export class AppRoutingModule { }
