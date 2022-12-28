import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './Components/menu/menu.component';
import { PortalComponent } from './Components/portal/portal.component';

const routes: Routes = [
  {path: 'portal', component:PortalComponent},
  {path: '', component:MenuComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
