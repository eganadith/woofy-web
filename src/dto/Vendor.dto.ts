import {VendorproductsDto} from "./Vendorproducts.dto";

export interface IVendor {
    objectId?:    string;
    vendorId?: string;
vendorName?: string;
address?: string;
city?: string;
country?: string;
notes?: string;

vendorProduct?: VendorproductsDto[];

}

export class VendorDto implements IVendor {
    constructor(
        public objectId?:    string,
        public vendorId?: string,
public vendorName?: string,
public address?: string,
public city?: string,
public country?: string,
public notes?: string,
public vendorProduct?: VendorproductsDto[],
    ) {
    }
}
