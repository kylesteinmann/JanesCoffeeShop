export class Order {
  name: string;
  price: number;
  size?: string;
  flavors?:string[];
  quantity:number;
  id?: string;
  specialInstructions?:string;
  constructor(
    name: string,
    price: number,
    size: string,
    flavors:string[],
    quantity:number,
    id: string,
    specialInstructions:string
  ) {
    this.name=name;
    this.price = price
    this.size = size
    this.flavors = flavors
    this.quantity = quantity
    this.id=id
    this.specialInstructions=specialInstructions
  }
}
