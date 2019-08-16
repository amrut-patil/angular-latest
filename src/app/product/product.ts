export class Product {
    sku: string;
    name: string;
    type: string;
    categories: string;
    attributes: {name: string, value: string}[];

    constructor() {
        this.attributes = [];
    }
}