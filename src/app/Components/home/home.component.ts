import { Component } from '@angular/core';
import { MenuService } from 'src/app/Services/menu.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public menuService: MenuService) {
    menuService.fetchDrinkData()
    menuService. fetchTreatData()
  }

}
