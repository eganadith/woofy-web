import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {v4 as uuidv4} from 'uuid';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Subscription} from "rxjs";
import {IInvoice,InvoiceDto} from "../../../dto/Invoice.dto";
import {InvoiceService} from "../../../services/Invoice.service";
import { CheckboxModule } from 'primeng/checkbox';
interface City {
    name: string;
    code: string;
}
// @ts-ignore
@Component({
    selector: 'app-create-task',
    templateUrl: './create-update-invoice.html',

})

export class CreateUpdateInvoice implements OnInit, OnDestroy {
    invoice: InvoiceDto = {};

    submitted: boolean = false;
    selectedValues: string[] = [];
    cities: City[] |[]=[];
    cardtype: City[] |[]=[];
    currencytype : City[] |[]=[];
    ratetypes :  City[] |[]=[];

    private subscription: Subscription = new Subscription();

    constructor(private invoiceService: InvoiceService, private messageService: MessageService, public config: DynamicDialogConfig, public ref: DynamicDialogRef) {
    }

    ngOnInit(): void {
        //set default data
        this.cities = [
            { name: 'Infor', code: 'NY' },
            { name: 'Epico', code: 'RM' },
        ];

        this.cardtype = [
            { name: 'Visa', code: 'NY' },
            { name: 'Mater Card', code: 'RM' },
            { name: 'American Express', code: 'LDN' },
            { name: 'TT', code: 'IST' },
        ];

        this.currencytype = [
            { name: 'LKR', code: 'NY' },
            { name: 'USD', code: 'RM' },
            { name: 'AED', code: 'LDN' },
            { name: 'INR', code: 'IST' },
        ];

        this.ratetypes = [
            { name: 'Fixed Exchange Rate', code: 'NY' },
            { name: 'Flexible Exchange Rate', code: 'RM' },
            { name: 'Managed Floating Exchange Rate', code: 'LDN' },
        ];

        //edit invoice if requested by the row click
        if (this.config.data != null) {
            this.editInvoice(this.config.data)
        }

    }


    save() {
        this.submitted = true
        this.invoice.holdInvoice = !!this.invoice.holdInvoice;
        this.invoice.holdPayment = !!this.invoice.holdPayment;
        this.invoice.allowOverride = !!this.invoice.allowOverride;
        this.invoice.recurring = !!this.invoice.recurring;
        this.invoice.lock = !!this.invoice.lock;
        //update if their is an objectId
        if (this.invoice.objectId) {
            this.subscription.add(
                this.invoiceService.updateInvoice(this.invoice).subscribe(() => {
                    this.CloseInstances();

                })
            );

            this.messageService.add({
                severity: 'success',
                summary: 'Update Successfully',
                detail: `  updated successfully.`,
                life: 3000
            });
        }
        //else create invoice
        else {
            this.invoice.objectId = uuidv4();
            this.subscription.add(
                this.invoiceService.createInvoice(this.invoice).subscribe(() => {
                    this.CloseInstances();
                })
            );

            this.messageService.add({
                severity: 'success',
                summary: 'Create Successfully ',
                detail: ` created successfully.`,
                life: 3000
            });
        }

    }


    //close dialog instances
    CloseInstances() {
        this.ref.close(this.invoice)
        this.submitted = false
        this.invoice = {}

    }

    //unsubscribe all the services
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    //edit invoice
    editInvoice(invoice: InvoiceDto) {
        this.invoice = {...invoice};
    }

    //format date
    formatDate(date: string | number | Date) {
        let newdate = new Date(date)
        let month = ("0" + (newdate.getMonth() + 1)).slice(-2)
        let day = ("0" + (newdate.getDate())).slice(-2)

        if (date) {
            return newdate.getFullYear() + "-" + (month) + "-" + (day)
        } else {
            return "-"
        }
    }
}
