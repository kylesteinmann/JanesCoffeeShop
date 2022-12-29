export class Drink {
  drinkName: string;
  regularPrice: string;
  largePrice: string;
  id?: string;
  specialInstructions?:string;
  constructor(
    drinkName: string,
    regularPrice: string,
    largePrice: string,
    id: string,
    specialInstructions?:string
  ) {
    this.drinkName = drinkName;
    this.id = id;
    this.regularPrice = regularPrice;
    this.largePrice = largePrice;
    this.specialInstructions=specialInstructions;
  }
}
