import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Components/auth/auth.component';
import { MenuComponent } from './Components/menu/menu.component';
import { PortalComponent } from './Components/portal/portal.component';
import { AuthGuardService } from './Services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  {
    path: 'portal',
    component: PortalComponent,
    canActivate: [AuthGuardService]
  },
  { path: '', component: MenuComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
