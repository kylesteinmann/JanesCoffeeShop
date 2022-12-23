import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Drink } from '../Models/drink';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  drinkItems: Drink[] = [];

  constructor(private http: HttpClient) {}

  addDrink(drinkData: NgForm) {
    this.http
      .post(
        'https://janescoffeehouse-78763-default-rtdb.firebaseio.com/drinks.json',
        drinkData.value
      )
      .subscribe();
    this.drinkItems.push(drinkData.value);
    drinkData.resetForm();
  }

  fetchDrinkData() {
    this.http
      .get<{ [key: string]: Drink }>(
        'https://janescoffeehouse-78763-default-rtdb.firebaseio.com/drinks.json'
      )
      .pipe(
        map((responseData) => {
          const drinks = [];
          for (const key in responseData) {
            drinks.push({ ...responseData[key], id: key });
          }
          return drinks;
        })
      )
      .subscribe((drinksData) => {
        console.log(drinksData);
        this.drinkItems = drinksData;
      });
  }

  onRemoveDrink(id: any) {
    this.http
      .delete(
        'https://janescoffeehouse-78763-default-rtdb.firebaseio.com/drinks/' +
          id +
          '.json'
      )
      .subscribe(() => {
        console.log(id)
        this.fetchDrinkData();
      });
  }
}
