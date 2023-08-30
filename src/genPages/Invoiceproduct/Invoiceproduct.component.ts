import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Table} from 'primeng/table';
import {filter, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {DomSanitizer} from '@angular/platform-browser';
import {IInvoiceproduct,InvoiceproductDto} from "../../dto/Invoiceproduct.dto";
import {InvoiceproductService} from "../../services/Invoiceproduct.service";
import {CreateUpdateInvoiceproduct } from "./create-update-invoiceproduct/create-update-invoiceproduct";

@Component({
    templateUrl: './Invoiceproduct.component.html'
})

export class InvoiceproductComponent implements OnInit {

    InvoiceproductData: InvoiceproductDto[] = [];

    isDataLoading: boolean = false;

    private subscription: Subscription = new Subscription();


    constructor(private sanitizer: DomSanitizer,private invoiceproductService: InvoiceproductService, private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router,  private dialogService: DialogService) {
    }

    ngOnInit() {
        this.findAllInvoiceproduct({})
        this.isDataLoading = true;

    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    navigateToCreateUser() {
        this.router.navigate(['profile/create'])
    }

    //Find all data from db
    findAllInvoiceproduct(params: any) {
        this.subscription.add(
        this.invoiceproductService.findAllInvoiceproduct(params).pipe(
            filter((res: HttpResponse<IInvoiceproduct[]>) => res.ok),
            map((res: HttpResponse<IInvoiceproduct[]>) => res.body)
        )
            .subscribe(
                (res: IInvoiceproduct[] | null) => {
                    if (res != null) {
                        this.InvoiceproductData = res;
                    } else {
                        this.InvoiceproductData = [];
                    }
                    this.isDataLoading = false;
                },

                (res: HttpErrorResponse) => console.log("error in extracting all Invoiceproduct", res)
            )
        );
    }

    //dynamic dialog
    showCreateInvoiceproductDialog() {
        const ref = this.dialogService.open(CreateUpdateInvoiceproduct, {
            header: 'Create Invoiceproduct',
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
            this.findAllInvoiceproduct({})
        })
    }

    showEditInvoiceproductDialog(Invoiceproduct: InvoiceproductDto) {
        const ref = this.dialogService.open(CreateUpdateInvoiceproduct , {
            data: Invoiceproduct,
           // header: 'Update Invoiceproduct ' + Invoiceproduct.itemName,
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
            this.findAllInvoiceproduct({})
        })
    }

    //delete Invoiceproduct
    deleteInvoiceproduct(Invoiceproduct: InvoiceproductDto) {
        this.confirmationService.confirm({
           // message: `Are you sure that you want to delete "${ Invoiceproduct.itemName}"?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ConfirmDeleteInvoiceproduct(Invoiceproduct)
                this.messageService.add({
                    severity: 'error',
                    summary: 'Deleted',
                    detail: 'You have deleted ' 
                });
            },
        });
    }

    ConfirmDeleteInvoiceproduct(Invoiceproduct: InvoiceproductDto) {
        this.InvoiceproductData = this.InvoiceproductData.filter(val => val.objectId !== Invoiceproduct.objectId);
        this.subscription.add(
        this.invoiceproductService.deleteInvoiceproduct({objectId: Invoiceproduct.objectId}).subscribe(() => {
        })
        );
    }

    //remove html meta data
    removeHtmlTags(description: string): string {
        return description.replace(/<[^>]*>/g, '');
    }

}
