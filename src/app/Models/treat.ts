export class Treat {
    treatName: string;
    regularPrice: string;
    id?: string;
    constructor(
      treatName: string,
      regularPrice: string,
      id: string
    ) {
      this.treatName = treatName;
      this.id = id;
      this.regularPrice = regularPrice;

    }
}
