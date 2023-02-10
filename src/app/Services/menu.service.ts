import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Drink } from '../Models/drink';
import { Treat } from '../Models/treat';
import { HttpClient } from '@angular/common/http';
import { interval, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DrinkComponent } from '../Modals/drink/drink.component';
import { TreatComponent } from '../Modals/treat/treat.component';
import { OrderComponent } from '../Modals/order/order.component';
import { Order } from '../Models/order';
import { Flavor } from '../Models/flavor';
import { Database } from './database';


@Injectable({
  providedIn: 'root',
})
export class MenuService {
  drinkItems: Drink[] = [];
  treatItems: Treat[] = [];
  flavorItems: Flavor[] = [];
  currentDrinkSelected: any;
  currentTreatSelected: any;
  currentOrder: Order[] = [];
  incomingOrders: any = [];
  itemsInOrderMessage = false;



  constructor(private http: HttpClient, public dialog: MatDialog
  ) {
    interval(10000).subscribe(() => this.fetchIncomeingOrdersData())
  }

  addDrink(drinkData: Drink) {
    console.log(drinkData);
    this.http.post(Database.url + 'drinks.json', drinkData).subscribe(() => {
      this.drinkItems.push(drinkData);
    });
  }

  fetchDrinkData() {
    this.http
      .get<{ [key: string]: Drink }>(Database.url + 'drinks.json')
      .pipe(
        map((responseData) => {
          const drinks = [];
          for (const key in responseData) {
            drinks.push({ ...responseData[key], id: key });
          }
          return drinks;
        })
      )
      .subscribe((drinksData: any) => {
        this.drinkItems = drinksData;
      });
  }

  onRemoveDrink(id: any) {
    this.http.delete(Database.url + 'drinks/' + id + '.json').subscribe(() => {
      this.fetchDrinkData();
    });
  }

  addTreat(treatsData: Treat) {
    this.http.post(Database.url + 'treats.json', treatsData).subscribe();
    this.treatItems.push(treatsData);
  }

  fetchTreatData() {
    this.http
      .get<{ [key: string]: Treat }>(Database.url + 'treats.json')
      .pipe(
        map((responseData) => {
          const treats: any[] = [];
          for (const key in responseData) {
            treats.push({ ...responseData[key], id: key });
          }
          return treats;
        })
      )
      .subscribe((treatsData: any) => {
        this.treatItems = treatsData;
      });
  }

  onRemovetreat(id: any) {
    this.http.delete(Database.url + 'treats/' + id + '.json').subscribe(() => {
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
      specialInstructions:
        'Special Instructions: ' + drinkData.value.specialInstructions,
    };
    this.currentOrder.push(drinkDetails);
    this.itemsInOrderMessage = true;
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
    this.itemsInOrderMessage = true;
  }

  addFlavor(flavorData: Flavor) {
    this.http.post(Database.url + 'flavors.json', flavorData).subscribe(() => {
      this.fetchFlavorData();
    });
  }

  fetchFlavorData() {
    this.http
      .get<{ [key: string]: Treat }>(Database.url + '/flavors.json')
      .pipe(
        map((responseData) => {
          const flavors: any[] = [];
          for (const key in responseData) {
            flavors.push({ ...responseData[key], id: key });
          }
          return flavors;
        })
      )
      .subscribe((flavorData: any) => {
        this.flavorItems = flavorData;
      });
  }

  onRemoveFlavor(id: any) {
    this.http.delete(Database.url + 'flavors/' + id + '.json').subscribe(() => {
      this.fetchFlavorData();
    });
  }

  openOrderDialog() {
    this.dialog.open(OrderComponent);
  }

  onSubmitOrder() {
    this.http.post("127.0.0.1:3000/order_details.json", this.currentOrder).subscribe()
    
    // this.http
    //   .post(Database.url + 'orders.json', this.currentOrder)
    //   .subscribe(() => {
    //     this.itemsInOrderMessage = false;
    //     this.currentOrder = [];
    //   });

    
  }

  fetchIncomeingOrdersData() {
    this.http
      .get<{ [key: string]: Order }>(Database.url + 'orders.json')
      .pipe(
        map((responseData) => {
          const orders: any[] = [];
          for (const key in responseData) {
            orders.push({ ...responseData[key], id: key });
          }
          return orders;
        })
      )
      .subscribe((ordersData: any) => {
        this.incomingOrders = ordersData;
      });
  }

  onRemoveIncomingOrder(id: any) {
    this.http.delete(Database.url + 'orders/' + id + '.json').subscribe(() => {
      this.fetchIncomeingOrdersData();
    });
  }

  toArray(orders: any) {
    return Object.keys(orders).map((key) => orders[key]);
  }

  SubtotalPrice() {
    let totalPrice = 0;
    for (let item of this.currentOrder) {
      totalPrice = totalPrice + Number(item.quantity) * Number(item.price);
    }
    totalPrice = totalPrice * 0.09225
    return totalPrice;
  }

  sizeNameConversion(item: string | undefined) {
    if (item == undefined) {
      return '';
    } else if (item == 'largePrice') {
      return 'Large';
    } else return 'Regular';
  }

  resetForm(form: NgForm) {
    form.resetForm();
  }
}
