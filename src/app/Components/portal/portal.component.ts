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
  editFlavorsSelected = false;
  incomingOrdersSelected = true;

  constructor(public menuService: MenuService) {
    menuService.fetchDrinkData();
    menuService.fetchTreatData();
    menuService.fetchIncomeingOrdersData();
    menuService.fetchFlavorData();
  }
}
