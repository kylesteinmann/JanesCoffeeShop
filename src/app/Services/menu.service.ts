import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

drinkItems=[
  {drinkName: "White Chocolate Mocha", smallPrice: '5.50', largePrice: '6.00'},
  {drinkName: "Frappe's", smallPrice: '5.25', largePrice: '5.79s'},
  {drinkName: "White Chocolate Mocha", smallPrice: '5.50', largePrice: '6.00'},
  {drinkName: "White Chocolate Mocha", smallPrice: '5.50', largePrice: '6.00'},
  {drinkName: "White Chocolate Mocha", smallPrice: '5.50', largePrice: '6.00'},
  {drinkName: "White Chocolate Mocha", smallPrice: '5.50', largePrice: '6.00'},
]

  constructor() { }
}
