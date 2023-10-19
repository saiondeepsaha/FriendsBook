import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user.component';
import { SharedModule } from '../shared/shared.module';
import { registerActivateGuard } from 'src/app/guards/register-activate.guard';

const routes: Routes = [
  { path: '',
   component: UserComponent,
   loadChildren: () => import('../shared/shared.module').then(m => m.SharedModule),
   canActivate: [registerActivateGuard]
  }
];

@NgModule({
  imports: [ SharedModule, RouterModule.forChild(routes)],
  exports: [ SharedModule, RouterModule ],
  declarations: []
})
export class UserRoutingModule { }
