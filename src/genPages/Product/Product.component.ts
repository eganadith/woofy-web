import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Table} from 'primeng/table';
import {filter, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {DomSanitizer} from '@angular/platform-browser';
import {IProduct,ProductDto} from "../../dto/Product.dto";
import {ProductService} from "../../services/Product.service";
import {CreateUpdateProduct } from "./create-update-product/create-update-product";

@Component({
    templateUrl: './Product.component.html'
})

export class ProductComponent implements OnInit {

    ProductData: ProductDto[] = [];

    isDataLoading: boolean = false;

    private subscription: Subscription = new Subscription();


    constructor(private sanitizer: DomSanitizer,private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router,  private dialogService: DialogService) {
    }

    ngOnInit() {
        this.findAllProduct({})
        this.isDataLoading = true;

    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    navigateToCreateUser() {
        this.router.navigate(['profile/create'])
    }

    //Find all data from db
    findAllProduct(params: any) {
        this.subscription.add(
        this.productService.findAllProduct(params).pipe(
            filter((res: HttpResponse<IProduct[]>) => res.ok),
            map((res: HttpResponse<IProduct[]>) => res.body)
        )
            .subscribe(
                (res: IProduct[] | null) => {
                    if (res != null) {
                        this.ProductData = res;
                    } else {
                        this.ProductData = [];
                    }
                    this.isDataLoading = false;
                },

                (res: HttpErrorResponse) => console.log("error in extracting all Product", res)
            )
        );
    }

    //dynamic dialog
    showCreateProductDialog() {
        const ref = this.dialogService.open(CreateUpdateProduct, {
            header: 'Create Product',
            width: '60%',
            contentStyle: {
                "max-height": "500px",
                "overflow": "auto",
                "border-bottom-left-radius": "0.25rem",
                "border-bottom-right-radius": "0.25rem",
                "border-top-width": "1px",
                "border-top-style": "solid",
                "border-width": "1px",
                "border-style": "solid",
                "border-color": "#e4e4e4",
                "baseZIndex": "10000",
                "closable": "true"
            }
        })
        ref.onClose.subscribe(() => {
            this.findAllProduct({})
        })
    }

    showEditProductDialog(Product: ProductDto) {
        const ref = this.dialogService.open(CreateUpdateProduct , {
            data: Product,
           // header: 'Update Product ' + Product.itemName,
            width: '60%',
            contentStyle: {
                "max-height": "500px",
                "overflow": "auto",
                "border-bottom-left-radius": "0.25rem",
                "border-bottom-right-radius": "0.25rem",
                "border-top-width": "1px",
                "border-top-style": "solid",
                "border-width": "1px",
                "border-style": "solid",
                "border-color": "#e4e4e4",
                "baseZIndex": "10000",
                "closable": "true"
            }
        })
        ref.onClose.subscribe(() => {
            this.findAllProduct({})
        })
    }

    //delete Product
    deleteProduct(Product: ProductDto) {
        this.confirmationService.confirm({
           // message: `Are you sure that you want to delete "${ Product.itemName}"?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ConfirmDeleteProduct(Product)
                this.messageService.add({
                    severity: 'error',
                    summary: 'Deleted',
                    detail: 'You have deleted ' 
                });
            },
        });
    }

    ConfirmDeleteProduct(Product: ProductDto) {
        this.ProductData = this.ProductData.filter(val => val.objectId !== Product.objectId);
        this.subscription.add(
        this.productService.deleteProduct({objectId: Product.objectId}).subscribe(() => {
        })
        );
    }

    //remove html meta data
    removeHtmlTags(description: string): string {
        return description.replace(/<[^>]*>/g, '');
    }

}
