import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortalComponent } from './Components/portal/portal.component';

const routes: Routes = [
  {path: 'portal', component:PortalComponent},
  // {path: '', component:MenuCom},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
