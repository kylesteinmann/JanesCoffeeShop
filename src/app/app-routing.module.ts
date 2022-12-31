import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Components/auth/auth.component';
import { MenuComponent } from './Components/menu/menu.component';
import { PortalComponent } from './Components/portal/portal.component';

const routes: Routes = [
  {path: 'portal', component:PortalComponent},
  {path: '', component:MenuComponent},
  {path:'auth', component:AuthComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
