import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import { ProductDto, IProduct } from "../dto/Product.dto";

type EntityResponseType = HttpResponse<ProductDto>;
type EntityArrayResponseType = HttpResponse<ProductDto[]>;

// @ts-ignore
@Injectable()
export class ProductService {

    resourceUrl = environment.microServerUrl

    headers = {
        AuthToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImRhbWluZHUifQ.B8BvnQhFGX7QMJzsSH8z5mJwss3YdpHpSBH7M9Zia4k"
    }

    constructor(private http: HttpClient) { }




        createProduct(product: IProduct): Observable<HttpResponse<ProductDto>> {

            return this.http.post<ProductDto>(`${this.resourceUrl}/CreateProduct`, product, { observe: 'response', headers: this.headers });

        }























        updateProduct(product: IProduct): Observable<HttpResponse<ProductDto>> {

             return this.http.put<ProductDto>(`${this.resourceUrl}/UpdateProduct`, product, { observe: 'response', headers: this.headers });

        }


























    deleteProduct(req?: any): Observable<HttpResponse<IProduct>> {

              return this.http.delete<ProductDto>(`${this.resourceUrl}/DeleteProduct`, { params: req, observe: 'response', headers: this.headers });

    }


















    findProduct(req?: any): Observable<HttpResponse<IProduct>> {

             return this.http.get<ProductDto>(`${this.resourceUrl}/FindProduct`, { params: req, observe: 'response', headers: this.headers });

    }


















    findAllProduct(params: any): Observable<HttpResponse<ProductDto[]>> {

            return this.http.get<ProductDto[]>(`${this.resourceUrl}/FindallProduct`,{ params, observe: 'response', headers: this.headers });

    }














}
