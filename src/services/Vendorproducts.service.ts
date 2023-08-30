import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import { VendorproductsDto, IVendorproducts } from "../dto/Vendorproducts.dto";
import {InvoiceproductDto} from "../dto/Invoiceproduct.dto";

type EntityResponseType = HttpResponse<VendorproductsDto>;
type EntityArrayResponseType = HttpResponse<VendorproductsDto[]>;

// @ts-ignore
@Injectable()
export class VendorproductsService {

    resourceUrl = environment.microServerUrl

    headers = {
        AuthToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImRhbWluZHUifQ.B8BvnQhFGX7QMJzsSH8z5mJwss3YdpHpSBH7M9Zia4k"
    }

    constructor(private http: HttpClient) { }




        createVendorproducts(vendorproducts: IVendorproducts): Observable<HttpResponse<VendorproductsDto>> {

            return this.http.post<VendorproductsDto>(`${this.resourceUrl}/CreateVendorproducts`, vendorproducts, { observe: 'response', headers: this.headers });

        }




        updateVendorproducts(vendorproducts: IVendorproducts): Observable<HttpResponse<VendorproductsDto>> {

             return this.http.put<VendorproductsDto>(`${this.resourceUrl}/UpdateVendorproducts`, vendorproducts, { observe: 'response', headers: this.headers });

        }





    deleteVendorproducts(req?: any): Observable<HttpResponse<IVendorproducts>> {

              return this.http.delete<VendorproductsDto>(`${this.resourceUrl}/DeleteVendorproducts`, { params: req, observe: 'response', headers: this.headers });

    }



    findVendorproducts(req?: any): Observable<HttpResponse<IVendorproducts>> {

             return this.http.get<VendorproductsDto>(`${this.resourceUrl}/FindVendorproducts`, { params: req, observe: 'response', headers: this.headers });

    }




    findAllVendorproducts(params: any): Observable<HttpResponse<VendorproductsDto[]>> {

            return this.http.get<VendorproductsDto[]>(`${this.resourceUrl}/FindallVendorproducts`,{ params, observe: 'response', headers: this.headers });

    }


    findallVendorproductbyVendorId(params: any): Observable<EntityArrayResponseType> {
        return this.http.get<InvoiceproductDto[]>(this.resourceUrl+`/FindallVendorproductsbyVendorId`, {params: params, observe: 'response', headers: this.headers });
    }

}
