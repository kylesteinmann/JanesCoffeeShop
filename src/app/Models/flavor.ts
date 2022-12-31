export class Flavor {
  flavorName: string;

  id?: string;

  constructor(
    flavorName:string,
    id: string,

  ) {

    this.id = id;
    this.flavorName = flavorName;

  }
}
