import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import { InvoiceDto, IInvoice } from "../dto/Invoice.dto";

type EntityResponseType = HttpResponse<InvoiceDto>;
type EntityArrayResponseType = HttpResponse<InvoiceDto[]>;

// @ts-ignore
@Injectable()
export class InvoiceService {

    resourceUrl = environment.serverUrl

    headers = {
        AuthToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImRhbWluZHUifQ.B8BvnQhFGX7QMJzsSH8z5mJwss3YdpHpSBH7M9Zia4k"
    }

    constructor(private http: HttpClient) { }




        createInvoice(invoice: IInvoice): Observable<HttpResponse<InvoiceDto>> {

            return this.http.post<InvoiceDto>(`${this.resourceUrl}/CreateInvoice`, invoice, { observe: 'response', headers: this.headers });

        }


        updateInvoice(invoice: IInvoice): Observable<HttpResponse<InvoiceDto>> {

             return this.http.put<InvoiceDto>(`${this.resourceUrl}/UpdateInvoice`, invoice, { observe: 'response', headers: this.headers });

        }



    deleteInvoice(req?: any): Observable<HttpResponse<IInvoice>> {

              return this.http.delete<InvoiceDto>(`${this.resourceUrl}/DeleteInvoice`, { params: req, observe: 'response', headers: this.headers });

    }



    findInvoice(req?: any): Observable<HttpResponse<IInvoice>> {

             return this.http.get<InvoiceDto>(`${this.resourceUrl}/FindInvoice`, { params: req, observe: 'response', headers: this.headers });

    }


















    findAllInvoice(params: any): Observable<HttpResponse<InvoiceDto[]>> {

            return this.http.get<InvoiceDto[]>(`${this.resourceUrl}/FindallInvoice`,{ params, observe: 'response', headers: this.headers });

    }














}
