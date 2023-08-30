import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import { InvoiceproductDto, IInvoiceproduct } from "../dto/Invoiceproduct.dto";

type EntityResponseType = HttpResponse<InvoiceproductDto>;
type EntityArrayResponseType = HttpResponse<InvoiceproductDto[]>;

// @ts-ignore
@Injectable()
export class InvoiceproductService {

    resourceUrl = environment.serverUrl

    headers = {
        AuthToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImRhbWluZHUifQ.B8BvnQhFGX7QMJzsSH8z5mJwss3YdpHpSBH7M9Zia4k"
    }

    constructor(private http: HttpClient) { }




        createInvoiceproduct(invoiceproduct: IInvoiceproduct): Observable<HttpResponse<InvoiceproductDto>> {

            return this.http.post<InvoiceproductDto>(`${this.resourceUrl}/CreateInvoiceproduct`, invoiceproduct, { observe: 'response', headers: this.headers });

        }























        updateInvoiceproduct(invoiceproduct: IInvoiceproduct): Observable<HttpResponse<InvoiceproductDto>> {

             return this.http.put<InvoiceproductDto>(`${this.resourceUrl}/UpdateInvoiceproduct`, invoiceproduct, { observe: 'response', headers: this.headers });

        }


























    deleteInvoiceproduct(req?: any): Observable<HttpResponse<IInvoiceproduct>> {

              return this.http.delete<InvoiceproductDto>(`${this.resourceUrl}/DeleteInvoiceproduct`, { params: req, observe: 'response', headers: this.headers });

    }


















    findInvoiceproduct(req?: any): Observable<HttpResponse<IInvoiceproduct>> {

             return this.http.get<InvoiceproductDto>(`${this.resourceUrl}/FindInvoiceproduct`, { params: req, observe: 'response', headers: this.headers });

    }
    findallInvoiceproductbyInvoiceId(params: any): Observable<EntityArrayResponseType> {
        return this.http.get<InvoiceproductDto[]>(this.resourceUrl+`/FindallInvoiceproductbyInvoiceId`, {params: params, observe: 'response', headers: this.headers });
    }


















    findAllInvoiceproduct(params: any): Observable<HttpResponse<InvoiceproductDto[]>> {

            return this.http.get<InvoiceproductDto[]>(`${this.resourceUrl}/FindallInvoiceproduct`,{ params, observe: 'response', headers: this.headers });

    }














}
