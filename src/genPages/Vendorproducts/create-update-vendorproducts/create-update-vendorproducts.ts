import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {v4 as uuidv4} from 'uuid';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Subscription} from "rxjs";
import {IVendorproducts,VendorproductsDto} from "../../../dto/Vendorproducts.dto";
import {VendorproductsService} from "../../../services/Vendorproducts.service";

// @ts-ignore
@Component({
    selector: 'app-create-task',
    templateUrl: './create-update-vendorproducts.html',

})
export class CreateUpdateVendorproducts implements OnInit, OnDestroy {
    vendorproducts: VendorproductsDto = {};

    submitted: boolean = false;

    private subscription: Subscription = new Subscription();

    constructor(private vendorproductsService: VendorproductsService, private messageService: MessageService, public config: DynamicDialogConfig, public ref: DynamicDialogRef) {
    }

    ngOnInit(): void {
        //set default data

        //edit vendorproducts if requested by the row click
        if (this.config.data != null) {
            this.editVendorproducts(this.config.data.Vendor)
        }else {
            this.vendorproducts.vendorId=this.config.data.Vendor
            console.log(this.vendorproducts.vendorId)
        }

    }


    save() {
        this.submitted = true

        //update if their is an objectId
        if (this.vendorproducts.objectId) {
            this.subscription.add(
                this.vendorproductsService.updateVendorproducts(this.vendorproducts).subscribe(() => {
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
        //else create vendorproducts
        else {
            this.vendorproducts.objectId = uuidv4();
            this.vendorproducts.vendorId=this.config.data.Vendor
            this.subscription.add(
                this.vendorproductsService.createVendorproducts(this.vendorproducts).subscribe(() => {
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
        this.ref.close(this.vendorproducts)
        this.submitted = false
        this.vendorproducts = {}

    }

    //unsubscribe all the services
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    //edit vendorproducts
    editVendorproducts(vendorproducts: VendorproductsDto) {
        this.vendorproducts = {...vendorproducts};
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
