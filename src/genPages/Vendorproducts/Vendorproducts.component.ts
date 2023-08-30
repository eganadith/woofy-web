import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Table} from 'primeng/table';
import {filter, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {DomSanitizer} from '@angular/platform-browser';
import {IVendorproducts,VendorproductsDto} from "../../dto/Vendorproducts.dto";
import {VendorproductsService} from "../../services/Vendorproducts.service";
import {CreateUpdateVendorproducts } from "./create-update-vendorproducts/create-update-vendorproducts";

@Component({
    templateUrl: './Vendorproducts.component.html'
})

export class VendorproductsComponent implements OnInit {

    VendorproductsData: VendorproductsDto[] = [];


    isDataLoading: boolean = false;

    private subscription: Subscription = new Subscription();


    constructor(private sanitizer: DomSanitizer,private vendorproductsService: VendorproductsService, private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router,  private dialogService: DialogService) {
    }

    ngOnInit() {
        this.findAllVendorproducts({})
        this.isDataLoading = true;

    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    navigateToCreateUser() {
        this.router.navigate(['profile/create'])
    }

    //Find all data from db
    findAllVendorproducts(params: any) {
        this.subscription.add(
        this.vendorproductsService.findAllVendorproducts(params).pipe(
            filter((res: HttpResponse<IVendorproducts[]>) => res.ok),
            map((res: HttpResponse<IVendorproducts[]>) => res.body)
        )
            .subscribe(
                (res: IVendorproducts[] | null) => {
                    if (res != null) {
                        this.VendorproductsData = res;
                    } else {
                        this.VendorproductsData = [];
                    }
                    this.isDataLoading = false;
                },

                (res: HttpErrorResponse) => console.log("error in extracting all Vendorproducts", res)
            )
        );
    }

    //dynamic dialog
    showCreateVendorproductsDialog() {
        const ref = this.dialogService.open(CreateUpdateVendorproducts, {
            header: 'Create Vendorproducts',
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
            this.findAllVendorproducts({})
        })
    }

    showEditVendorproductsDialog(Vendorproducts: VendorproductsDto) {
        const ref = this.dialogService.open(CreateUpdateVendorproducts , {
            data: Vendorproducts,
           // header: 'Update Vendorproducts ' + Vendorproducts.itemName,
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
            this.findAllVendorproducts({})
        })
    }

    //delete Vendorproducts
    deleteVendorproducts(Vendorproducts: VendorproductsDto) {
        this.confirmationService.confirm({
           // message: `Are you sure that you want to delete "${ Vendorproducts.itemName}"?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ConfirmDeleteVendorproducts(Vendorproducts)
                this.messageService.add({
                    severity: 'error',
                    summary: 'Deleted',
                    detail: 'You have deleted '
                });
            },
        });
    }

    ConfirmDeleteVendorproducts(Vendorproducts: VendorproductsDto) {
        this.VendorproductsData = this.VendorproductsData.filter(val => val.objectId !== Vendorproducts.objectId);
        this.subscription.add(
        this.vendorproductsService.deleteVendorproducts({objectId: Vendorproducts.objectId}).subscribe(() => {
        })
        );
    }

    //remove html meta data
    removeHtmlTags(description: string): string {
        return description.replace(/<[^>]*>/g, '');
    }

}
