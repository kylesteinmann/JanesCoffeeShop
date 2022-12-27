import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Drink } from '../Models/drink';
import { Treat } from '../Models/treat';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DrinkComponent } from '../Modals/drink/drink.component';
import { TreatComponent } from '../Modals/treat/treat.component';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  drinkItems: Drink[] = [];
  treatItems: Treat[] = [];
  currentDrinkSelected: any;
  currentTreatSelected: any;
  flavors = ['white Chololate', 'mocha', 'carmel'];
  currentOrder: any[] = [];
  incomingOrders = []

  constructor(private http: HttpClient, public dialog: MatDialog) { }

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
          const treats: any[] = [];
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

  openDrinksDialog(drinkInfo: any) {
    this.currentDrinkSelected = drinkInfo;
    this.dialog.open(DrinkComponent);
  }

  onAddDrinkToOrder(drinkData: NgForm, currentDrink: any) {
    const flavorKeys = Object.keys(drinkData.value);
    const filteredFlavorKeys = flavorKeys.filter((key) => {
      if (key !== 'size') {
        return drinkData.value[key];
      }
    });
    const currentPrice =
      drinkData.value.size === 'regularPrice'
        ? currentDrink.regularPrice
        : currentDrink.largePrice;

    const drinkDetails = {
      name: currentDrink.drinkName,
      flavors: filteredFlavorKeys,
      quanity: 1,
      size: drinkData.value.size,
      price: currentPrice,
    };
    this.currentOrder.push(drinkDetails);
    console.log(this.currentOrder)
  }

  openTreatsDialog(treatInfo: any) {
    this.currentTreatSelected = treatInfo;
    this.dialog.open(TreatComponent);
  }

  onAddTreatToOrder(treatData: NgForm, currentTreat: any) {
    const treatDetails = {
      name: currentTreat.treatName,
      quanity:treatData.value.quantity,
      price: currentTreat.regularPrice,
    };
    this.currentOrder.push(treatDetails);

    console.log(this.currentOrder)

  }

}
