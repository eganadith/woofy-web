import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Table} from 'primeng/table';
import {filter, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {DomSanitizer} from '@angular/platform-browser';
import {IVendor,VendorDto} from "../../dto/Vendor.dto";
import {VendorService} from "../../services/Vendor.service";
import {CreateUpdateVendor } from "./create-update-vendor/create-update-vendor";
import {CreateUpdateVendorproducts} from "../Vendorproducts/create-update-vendorproducts/create-update-vendorproducts";
import {IVendorproducts, VendorproductsDto} from "../../dto/Vendorproducts.dto";
import {VendorproductsService} from "../../services/Vendorproducts.service";
import {InvoiceDto} from "../../dto/Invoice.dto";
import {IInvoiceproduct} from "../../dto/Invoiceproduct.dto";

@Component({
    templateUrl: './Vendor.component.html'
})

export class VendorComponent implements OnInit {

    VendorData: VendorDto[] = [];

    VendorproductsData: VendorproductsDto[] = [];
    selectedRow: VendorDto={};
    expandedRows: any = {};
    isExpanded: boolean = false;

    isDataLoading: boolean = false;
    isDataLoading2: boolean = false;

    private subscription: Subscription = new Subscription();


    constructor(private sanitizer: DomSanitizer,private vendorproductsService: VendorproductsService,private vendorService: VendorService, private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router,  private dialogService: DialogService) {
    }

    ngOnInit() {
        this.findAllVendor({})
        this.isDataLoading = true;

    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    navigateToCreateUser() {
        this.router.navigate(['profile/create'])
    }

    expandAll() {
        if (!this.isExpanded) {
            this.VendorData.forEach(vendor => vendor && vendor.vendorId ? this.expandedRows[vendor.vendorId] = true : '');

        } else {
            this.expandedRows = {};
        }
        this.isExpanded = !this.isExpanded;
    }

    //Find all data from db
    findAllVendor(params: any) {
        this.subscription.add(
        this.vendorService.findAllVendor(params).pipe(
            filter((res: HttpResponse<IVendor[]>) => res.ok),
            map((res: HttpResponse<IVendor[]>) => res.body)
        )
            .subscribe(
                (res: IVendor[] | null) => {
                    if (res != null) {
                        this.VendorData = res;
                        this.findallVendorproductbyInvoiceId(res)
                    } else {
                        this.VendorData = [];
                    }
                    this.isDataLoading = false;
                },

                (res: HttpErrorResponse) => console.log("error in extracting all Vendor", res)
            )
        );
    }

    //dynamic dialog
    showCreateVendorDialog() {
        const ref = this.dialogService.open(CreateUpdateVendor, {
            header: 'Create Vendor',
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
            this.findAllVendor({})
        })
    }

    showEditVendorDialog(Vendor: VendorDto) {
        const ref = this.dialogService.open(CreateUpdateVendor , {
            data: Vendor,
           // header: 'Update Vendor ' + Vendor.itemName,
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
            this.findAllVendor({})
        })
    }

    //delete Vendor
    deleteVendor(Vendor: VendorDto) {
        this.confirmationService.confirm({
           // message: `Are you sure that you want to delete "${ Vendor.itemName}"?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ConfirmDeleteVendor(Vendor)
                this.messageService.add({
                    severity: 'error',
                    summary: 'Deleted',
                    detail: 'You have deleted '
                });
            },
        });
    }

    ConfirmDeleteVendor(Vendor: VendorDto) {
        this.VendorData = this.VendorData.filter(val => val.objectId !== Vendor.objectId);
        this.subscription.add(
        this.vendorService.deleteVendor({objectId: Vendor.objectId}).subscribe(() => {
        })
        );
    }

    //remove html meta data
    removeHtmlTags(description: string): string {
        return description.replace(/<[^>]*>/g, '');
    }

    showCreateVendorproductsDialog(Vendor:VendorDto) {
        const ref = this.dialogService.open(CreateUpdateVendorproducts, {
            header: 'Create Vendorproducts',
            data:{Vendor:Vendor.vendorId},
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

    findallVendorproductbyInvoiceId(vendor:VendorDto[]) {
        vendor.map((data:VendorDto,i:any)=> {
                let params={
                    vendorId:data.vendorId
                }
                this.subscription.add(
                    this.vendorproductsService.findallVendorproductbyVendorId(params).pipe(
                        filter((res: HttpResponse<IVendorproducts[]>) => res.ok),
                        map((res: HttpResponse<IVendorproducts[]>) => res.body)
                    )
                        .subscribe(
                            (res: IVendorproducts[] | null) => {
                                if (res != null) {
                                    this.VendorData[i].vendorProduct = res;

                                } else {
                                    this.VendorData[i].vendorProduct = [];

                                }
                                this.isDataLoading = false;
                            },

                            (res: HttpErrorResponse) => console.log("error in extracting all Invoice", res)
                        )
                );
            }
        )
    }

}
