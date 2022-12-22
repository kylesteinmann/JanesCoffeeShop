export class Drink {
  drinkName: string;
  regularPrice: string;
  largePrice: string;
  id?: string;
  constructor(
    drinkName: string,
    regularPrice: string,
    largePrice: string,
    id: string
  ) {
    this.drinkName = drinkName;
    this.id = id;
    this.regularPrice = regularPrice;
    this.largePrice = largePrice;
  }
}
