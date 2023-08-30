export interface IProduct {
    objectId?:    string;
    productId?: string;
productName?: string;
price?: Number;
quantity?: Number;
description?: string;
manufacturer?: string;

}

export class ProductDto implements IProduct {
    constructor(
        public objectId?:    string,
        public productId?: string,
public productName?: string,
public price?: Number,
public quantity?: Number,
public description?: string,
public manufacturer?: string,

    ) {
    }
}
