import {InvoiceproductDto} from "./Invoiceproduct.dto";

export interface IInvoice {
    objectId?:    string;
    invoiceId?: string;
invoiceName?: string;
vendorAddress?: string;
confirmationDate?: string;
description?: string;
terms?: string;
holdInvoice?: boolean;
holdPayment?: boolean;
allowOverride?: boolean;
recurring?: boolean;
currency?: Number;
exchangeRate?: Number;
rateType?: Number;
lock?: boolean;
refNo?: Number;
invoiceType?: string;
invoiceDate?: string;
applyDate?: string;
fiscalYear?: string;
period?: string;
dueDate?: string;
amount?: Number;
paymentMethod?: string;
invoiceSummary?: string;

invoiceProduct?: InvoiceproductDto[];

}

export class InvoiceDto implements IInvoice {
    constructor(
        public objectId?:    string,
        public invoiceId?: string,
public invoiceName?: string,
public vendorAddress?: string,
public confirmationDate?: string,
public description?: string,
public terms?: string,
public holdInvoice?: boolean,
public holdPayment?: boolean,
public allowOverride?: boolean,
public recurring?: boolean,
public currency?: Number,
public exchangeRate?: Number,
public rateType?: Number,
public lock?: boolean,
public refNo?: Number,
public invoiceType?: string,
public invoiceDate?: string,
public applyDate?: string,
public fiscalYear?: string,
public period?: string,
public dueDate?: string,
public amount?: Number,
public paymentMethod?: string,
public invoiceSummary?: string,

      public  invoiceProduct?: InvoiceproductDto[],

    ) {
    }
}
