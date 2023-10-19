import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule} from '@angular/material/card';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { FriendsComponent } from './components/friends/friends.component';
import { HomeComponent } from './components/home/home.component';
import { NetworkComponent } from './components/network/network.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SharedComponent } from './shared.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/_helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/_helpers/error.interceptor';

const routes: Routes = [
  { path: '', component: SharedComponent },
  {	path: '', pathMatch: 'full', redirectTo: '/' + environment.appConstants.routes.USER.HOME },
  { path: environment.appConstants.routes.USER.HOME, component: HomeComponent },
  { path: environment.appConstants.routes.USER.FRIENDS, component: FriendsComponent },
  { path: environment.appConstants.routes.USER.NETWORK, component: NetworkComponent },
  { path: environment.appConstants.routes.USER.SETTINGS, component: SettingsComponent },
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes),
    MatTabsModule, MatInputModule, MatCardModule, MatIconModule, MatButtonModule, MatPaginatorModule, MatProgressSpinnerModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, MatProgressSpinnerModule,
    MatTabsModule, MatInputModule, MatCardModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  declarations: [HomeComponent, FriendsComponent, SettingsComponent, NetworkComponent],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
})
export class SharedRoutingModule { }
