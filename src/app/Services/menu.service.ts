import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Drink } from '../Models/drink';
import { Treat } from '../Models/treat';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  drinkItems: Drink[] = [];
  treatItems: Treat[] = [];

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
        console.log(id);
        this.fetchDrinkData();
      });
  }
  addTreat(treatsData: NgForm) {
    this.http
      .post(
        'https://janescoffeehouse-78763-default-rtdb.firebaseio.com/treats.json',
        treatsData.value
      )
      .subscribe();
    this.drinkItems.push(treatsData.value);
    treatsData.resetForm();
  }

  fetchTreatData() {
    this.http
      .get<{ [key: string]: Treat }>(
        'https://janescoffeehouse-78763-default-rtdb.firebaseio.com/treats.json'
      )
      .pipe(
        map((responseData) => {
          const treats = [];
          for (const key in responseData) {
            treats.push({ ...responseData[key], id: key });
          }
          return treats;
        })
      )
      .subscribe((treatsData) => {
        console.log(treatsData);
        this.treatItems = treatsData;
      });
  }

  onRemovetreat(id: any) {
    this.http
      .delete(
        'https://janescoffeehouse-78763-default-rtdb.firebaseio.com/treats/' +
          id +
          '.json'
      )
      .subscribe(() => {
        console.log(id);
        this.fetchTreatData();
      });
  }
}
