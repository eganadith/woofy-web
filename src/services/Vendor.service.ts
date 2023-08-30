import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import { VendorDto, IVendor } from "../dto/Vendor.dto";

type EntityResponseType = HttpResponse<VendorDto>;
type EntityArrayResponseType = HttpResponse<VendorDto[]>;

// @ts-ignore
@Injectable()
export class VendorService {

    resourceUrl = environment.microServerUrl

    headers = {
        AuthToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImRhbWluZHUifQ.B8BvnQhFGX7QMJzsSH8z5mJwss3YdpHpSBH7M9Zia4k"
    }

    constructor(private http: HttpClient) { }




        createVendor(vendor: IVendor): Observable<HttpResponse<VendorDto>> {

            return this.http.post<VendorDto>(`${this.resourceUrl}/CreateVendor`, vendor, { observe: 'response', headers: this.headers });

        }























        updateVendor(vendor: IVendor): Observable<HttpResponse<VendorDto>> {

             return this.http.put<VendorDto>(`${this.resourceUrl}/UpdateVendor`, vendor, { observe: 'response', headers: this.headers });

        }


























    deleteVendor(req?: any): Observable<HttpResponse<IVendor>> {

              return this.http.delete<VendorDto>(`${this.resourceUrl}/DeleteVendor`, { params: req, observe: 'response', headers: this.headers });

    }


















    findVendor(req?: any): Observable<HttpResponse<IVendor>> {

             return this.http.get<VendorDto>(`${this.resourceUrl}/FindVendor`, { params: req, observe: 'response', headers: this.headers });

    }


















    findAllVendor(params: any): Observable<HttpResponse<VendorDto[]>> {

            return this.http.get<VendorDto[]>(`${this.resourceUrl}/FindallVendor`,{ params, observe: 'response', headers: this.headers });

    }














}
