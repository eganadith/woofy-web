export interface IInvoiceproduct {
    invoiceId?: string;
    objectId?:    string;
    invoiceProductId?: string;
productName?: string;
quantity?: Number;
unitPrice?: Number;
manufacturer?: string;
description?: string;
productId?: string;

}

export class InvoiceproductDto implements IInvoiceproduct {
    constructor(
        public invoiceId?: string,
        public objectId?:    string,
        public invoiceProductId?: string,
public productName?: string,
public quantity?: Number,
public unitPrice?: Number,
public manufacturer?: string,
public description?: string,
public productId?: string,

    ) {
    }
}
