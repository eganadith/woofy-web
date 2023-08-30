import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Table} from 'primeng/table';
import {filter, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {DialogService, DynamicDialogConfig} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {DomSanitizer} from '@angular/platform-browser';
import {IInvoice,InvoiceDto} from "../../dto/Invoice.dto";
import {InvoiceService} from "../../services/Invoice.service";
import {CreateUpdateInvoice } from "./create-update-invoice/create-update-invoice";
import {InvoiceproductService} from "../../services/Invoiceproduct.service";
import {IInvoiceproduct, InvoiceproductDto} from "../../dto/Invoiceproduct.dto";
// import * as jsPDF from 'jspdf';
import {VendorDto} from "../../dto/Vendor.dto";
import {CreateUpdateInvoiceproduct} from "../Invoiceproduct/create-update-invoiceproduct/create-update-invoiceproduct";



@Component({
    templateUrl: './Invoice.component.html'
})

export class InvoiceComponent implements OnInit {

    @ViewChild('invoicecontent2', {static: false}) el!: ElementRef
    InvoiceData: InvoiceDto[] = [];
    newinvoiceDialog: boolean = false;
    InvoiceProduct: InvoiceproductDto[]=[];
    selectedRow: InvoiceDto={};
    expandedRows: any = {};
    isExpanded: boolean = false;
    selectedDateForFiltering: Date | any ;

    invoiceDataOne: InvoiceDto | undefined;

    isDataLoading: boolean = false;
    isDataLoading2: boolean = false;
    InvoiceproductData: InvoiceproductDto[] = [];

    private subscription: Subscription = new Subscription();


    constructor(private config: DynamicDialogConfig,private sanitizer: DomSanitizer,private invoiceService: InvoiceService,private invoiceproductService:InvoiceproductService, private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router,  private dialogService: DialogService) {
    }

    ngOnInit() {
        this.findAllInvoice({})
        this.isDataLoading = true;

    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    navigateToCreateUser() {
        this.router.navigate(['profile/create'])
    }

    //Find all data from db
    findAllInvoice(params: any) {
        this.subscription.add(
        this.invoiceService.findAllInvoice(params).pipe(
            filter((res: HttpResponse<IInvoice[]>) => res.ok),
            map((res: HttpResponse<IInvoice[]>) => res.body)
        )
            .subscribe(
                (res: IInvoice[] | null) => {
                    if (res != null) {
                        this.InvoiceData = res;
                        this.findallInvoiceproductbyInvoiceId(res)
                    } else {
                        this.InvoiceData = [];
                    }
                    this.isDataLoading = false;
                },

                (res: HttpErrorResponse) => console.log("error in extracting all Invoice", res)
            )
        );
    }

    findallInvoiceproductbyInvoiceId(invoice:InvoiceDto[]) {
        invoice.map((data:InvoiceDto,i:any)=> {
           let params={
                invoiceId:data.invoiceId
                }
            this.subscription.add(
                this.invoiceproductService.findallInvoiceproductbyInvoiceId(params).pipe(
                    filter((res: HttpResponse<IInvoiceproduct[]>) => res.ok),
                    map((res: HttpResponse<IInvoiceproduct[]>) => res.body)
                )
                    .subscribe(
                        (res: IInvoiceproduct[] | null) => {
                            if (res != null) {
                                this.InvoiceData[i].invoiceProduct = res;

                            } else {
                                this.InvoiceData[i].invoiceProduct = [];

                            }
                            this.isDataLoading = false;
                        },

                        (res: HttpErrorResponse) => console.log("error in extracting all Invoice", res)
                    )
            );
        }
        )
    }


    //dynamic dialog
    showCreateInvoiceDialog() {
        const ref = this.dialogService.open(CreateUpdateInvoice, {
            header: 'Create Invoice',
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
            this.findAllInvoice({})
        })
    }

    showEditInvoiceDialog(Invoice: InvoiceDto) {
        const ref = this.dialogService.open(CreateUpdateInvoice , {
            data: Invoice,
           // header: 'Update Invoice ' + Invoice.itemName,
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
            this.findAllInvoice({})
        })
    }

    //delete Invoice
    deleteInvoice(Invoice: InvoiceDto) {
        this.confirmationService.confirm({
           // message: `Are you sure that you want to delete "${ Invoice.itemName}"?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ConfirmDeleteInvoice(Invoice)
                this.messageService.add({
                    severity: 'error',
                    summary: 'Deleted',
                    detail: 'You have deleted '
                });
            },
        });
    }

    ConfirmDeleteInvoice(Invoice: InvoiceDto) {
        this.InvoiceData = this.InvoiceData.filter(val => val.objectId !== Invoice.objectId);
        this.subscription.add(
        this.invoiceService.deleteInvoice({objectId: Invoice.objectId}).subscribe(() => {
        })
        );
    }

    //remove html meta data
    removeHtmlTags(description: string): string {
        return description.replace(/<[^>]*>/g, '');
    }

    openInvoice(invoice: InvoiceDto) {

        let params = {
            invoiceId: invoice.invoiceId
        }

        this.invoiceDataOne = {...invoice};

        // this.invoiceproductService.findInvoiceproduct(params).subscribe(res => {
        //     this.InvoiceProduct = res.body||[];
        // })
        this.invoiceproductService.findInvoiceproduct(params).subscribe(
            (res: HttpResponse<IInvoiceproduct> | IInvoiceproduct[] | null) => {
                if (res instanceof HttpResponse) {
                    // Handle the HttpResponse if needed
                } else if (Array.isArray(res)) {
                    this.InvoiceProduct = res;
                } else {
                    this.InvoiceProduct = [];
                }
            },
            (error: any) => {
                // Handle error if needed
            }
        );



        // this.invoiceDialog = true;
        this.newinvoiceDialog = true;
    }

    formatDate(date: string | number | Date) {

        let newdate = new Date(date)
        let month=("0" + (newdate.getMonth() + 1)).slice(-2)
        let day=("0" + (newdate.getDate())).slice(-2)

        if (date) {
            return newdate.getFullYear() + "-" + (month) + "-" + day
        } else {
            return "-"
        }
    }

    printInvoice() {
        // window.print();

        // @ts-ignore
        let pdf = new jsPDF("p", "pt", "a4");

        pdf.html(this.el.nativeElement, {
            callback: (pdf: { save: (arg0: string) => void; }) => {
                // save the shit
                pdf.save(this.invoiceDataOne?.invoiceName + "_invoice")
            }
        })
    }

    expandAll() {
        if (!this.isExpanded) {
            this.InvoiceData.forEach(invoice => invoice && invoice.invoiceId ? this.expandedRows[invoice.invoiceId] = true : '');

        } else {
            this.expandedRows = {};
        }
        this.isExpanded = !this.isExpanded;
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

    showCreateInvoiceproductDialog(Invoice:InvoiceDto) {
        const ref = this.dialogService.open(CreateUpdateInvoiceproduct, {
            header: 'Create Invoiceproduct',
            data:{Invoice:Invoice.invoiceId},
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

}
