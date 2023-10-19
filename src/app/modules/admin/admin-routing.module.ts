import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { environment } from '../../../environments/environment';
import { AdminComponent } from './admin.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { SharedModule } from '../shared/shared.module';
import { registerActivateGuard } from 'src/app/guards/register-activate.guard';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  { path: '',
    component: AdminComponent,
    loadChildren: () => import('../shared/shared.module').then(m => m.SharedModule),
    canActivate: [registerActivateGuard]
  },
  { path: environment.appConstants.routes.ADMIN.USERLIST, component: UsersListComponent }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatPaginatorModule, MatProgressSpinnerModule,MatIconModule],
  exports: [SharedModule, RouterModule, CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatPaginatorModule, MatProgressSpinnerModule,MatIconModule],
  declarations: [UsersListComponent]
})
export class AdminRoutingModule { }
