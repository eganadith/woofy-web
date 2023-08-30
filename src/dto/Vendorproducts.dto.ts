export interface IVendorproducts {
    objectId?:    string;
    vendorId?: string;
productId?: string;
unitPrice?: Number;
quantity?: Number;
description?: string;
vendorProductId?: string;
manufacturer?: string;

}

export class VendorproductsDto implements IVendorproducts {
    constructor(
        public objectId?:    string,
        public vendorId?: string,
public productId?: string,
public unitPrice?: Number,
public quantity?: Number,
public description?: string,
public vendorProductId?: string,
public manufacturer?: string,

    ) {
    }
}
