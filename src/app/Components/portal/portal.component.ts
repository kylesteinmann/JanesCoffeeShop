import { Component } from '@angular/core';
import { MenuService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css'],
})
export class PortalComponent {
  editDrinksSelected = false;
  editTreatsSelected = false;
  editSpecialsSelected = false;
  incomingOrders = true

  constructor(public menuService: MenuService) {
    menuService.fetchDrinkData();
    menuService.fetchTreatData()
  }
}
