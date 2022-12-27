import { Component } from '@angular/core';
import { MenuService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-treat',
  templateUrl: './treat.component.html',
  styleUrls: ['./treat.component.css']
})
export class TreatComponent {
  constructor(public menuService:MenuService){}

}
