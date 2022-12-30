import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Drink } from '../Models/drink';
import { Treat } from '../Models/treat';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DrinkComponent } from '../Modals/drink/drink.component';
import { TreatComponent } from '../Modals/treat/treat.component';
import { OrderComponent } from '../Modals/order/order.component';
import { Order } from '../Models/order';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  drinkItems: Drink[] = [];
  treatItems: Treat[] = [];
  flavorItems: any[] = [];
  currentDrinkSelected: any;
  currentTreatSelected: any;
  currentOrder: Order[] = [];
  incomingOrders: any = [];
  itemsInOrderMessage = false

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
      if (key !== 'specialInstructions') {
        if (key !== 'size') {
          return drinkData.value[key];
        }
      }
    });
    const currentPrice =
      drinkData.value.size === 'regularPrice'
        ? currentDrink.regularPrice
        : currentDrink.largePrice;

    const drinkDetails = {
      name: currentDrink.drinkName,
      flavors: filteredFlavorKeys,
      quantity: 1,
      size: drinkData.value.size,
      price: currentPrice,
      specialInstructions: 'Special Instructions: ' + drinkData.value.specialInstructions
    };
    this.currentOrder.push(drinkDetails);
    this.itemsInOrderMessage = true
    console.log(drinkData.value)

  }

  openTreatsDialog(treatInfo: any) {
    this.currentTreatSelected = treatInfo;
    this.dialog.open(TreatComponent);
  }

  onAddTreatToOrder(treatData: NgForm, currentTreat: any) {
    const treatDetails = {
      name: currentTreat.treatName,
      quantity: treatData.value.quantity,
      price: currentTreat.regularPrice,
    };
    this.currentOrder.push(treatDetails);
    this.itemsInOrderMessage = true


  }

  addFlavor(flavorData: NgForm) {
    this.http
      .post(
        'https://janescoffeehouse-78763-default-rtdb.firebaseio.com/flavors.json',
        flavorData.value
      )
      .subscribe(() => {
        this.fetchFlavorData()
        flavorData.resetForm();
      });

  }

  fetchFlavorData() {
    this.http
      .get<{ [key: string]: Treat }>(
        'https://janescoffeehouse-78763-default-rtdb.firebaseio.com/flavors.json'
      )
      .pipe(
        map((responseData) => {
          const flavors: any[] = [];
          for (const key in responseData) {
            flavors.push({ ...responseData[key], id: key });
          }
          return flavors;
        })
      )
      .subscribe((flavorData) => {

        this.flavorItems = flavorData;
      });
  }

  onRemoveFlavor(id: any) {
    this.http
      .delete(
        'https://janescoffeehouse-78763-default-rtdb.firebaseio.com/flavors/' +
        id +
        '.json'
      )
      .subscribe(() => {

        this.fetchFlavorData();
      });
  }

  openOrderDialog() {
    this.dialog.open(OrderComponent);
  }

  onSubmitOrder() {
    this.http.post('https://janescoffeehouse-78763-default-rtdb.firebaseio.com/orders.json', this.currentOrder).subscribe(() => {
      this.itemsInOrderMessage = false
      this.currentOrder = []
    }
    )
  }

  fetchIncomeingOrdersData() {
    this.http
      .get<{ [key: string]: Order }>(
        'https://janescoffeehouse-78763-default-rtdb.firebaseio.com/orders.json'
      )
      .pipe(
        map((responseData) => {
          const orders: any[] = [];
          for (const key in responseData) {
            orders.push({ ...responseData[key], id: key });
          }
          return orders;
        })
      )
      .subscribe((ordersData) => {

        this.incomingOrders = ordersData
          console.log(ordersData[0])
         ;
  });
}

onRemoveIncomingOrder(id: any) {
  this.http
    .delete(
      'https://janescoffeehouse-78763-default-rtdb.firebaseio.com/orders/' +
      id +
      '.json'
    )
    .subscribe(() => {

      this.fetchIncomeingOrdersData();
    });
}

toArray(orders: any) {
  return Object.keys(orders).map(key => orders[key])
}

totalPrice() {
  let totalPrice = 0
  for (let item of this.currentOrder) {
    totalPrice = totalPrice + (Number(item.quantity) * Number(item.price))

  }
  return totalPrice
}
sizeNameConversion(item: string | undefined) {
  if (item == "largePrice") {
    return "Large"
  } return "Regular"
}

}

