import { Component } from '@angular/core';
import { MenuService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.css']
})
export class DrinkComponent {
  constructor(public menuService:MenuService){

  }

}
