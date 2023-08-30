import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {v4 as uuidv4} from 'uuid';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Subscription} from "rxjs";
import {IInvoiceproduct,InvoiceproductDto} from "../../../dto/Invoiceproduct.dto";
import {InvoiceproductService} from "../../../services/Invoiceproduct.service";

// @ts-ignore
@Component({
    selector: 'app-create-task',
    templateUrl: './create-update-invoiceproduct.html',

})
export class CreateUpdateInvoiceproduct implements OnInit, OnDestroy {
    invoiceproduct: InvoiceproductDto = {};

    submitted: boolean = false;

    private subscription: Subscription = new Subscription();

    constructor(private invoiceproductService: InvoiceproductService, private messageService: MessageService, public config: DynamicDialogConfig, public ref: DynamicDialogRef) {
    }

    ngOnInit(): void {
        //set default data
        console.log(this.config.data)
        //edit invoiceproduct if requested by the row click
        if (this.config.data != null) {
            this.editInvoiceproduct(this.config.data.Invoice)
        }else {
            this.invoiceproduct.invoiceId=this.config.data.Invoice
            console.log(this.invoiceproduct.invoiceId)
        }

    }


    save() {
        this.submitted = true

        //update if their is an objectId
        if (this.invoiceproduct.objectId) {
            this.subscription.add(
                this.invoiceproductService.updateInvoiceproduct(this.invoiceproduct).subscribe(() => {
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
        //else create invoiceproduct
        else {
            this.invoiceproduct.objectId = uuidv4();
            this.invoiceproduct.invoiceId=this.config.data.Invoice
            this.subscription.add(
                this.invoiceproductService.createInvoiceproduct(this.invoiceproduct).subscribe(() => {
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
        this.ref.close(this.invoiceproduct)
        this.submitted = false
        this.invoiceproduct = {}

    }

    //unsubscribe all the services
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    //edit invoiceproduct
    editInvoiceproduct(invoiceproduct: InvoiceproductDto) {
        this.invoiceproduct = {...invoiceproduct};
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
