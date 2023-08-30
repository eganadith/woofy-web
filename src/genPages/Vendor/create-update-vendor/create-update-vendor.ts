import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {v4 as uuidv4} from 'uuid';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Subscription} from "rxjs";
import {IVendor,VendorDto} from "../../../dto/Vendor.dto";
import {VendorService} from "../../../services/Vendor.service";

// @ts-ignore
@Component({
    selector: 'app-create-task',
    templateUrl: './create-update-vendor.html',

})
export class CreateUpdateVendor implements OnInit, OnDestroy {
    vendor: VendorDto = {};

    submitted: boolean = false;

    private subscription: Subscription = new Subscription();

    constructor(private vendorService: VendorService, private messageService: MessageService, public config: DynamicDialogConfig, public ref: DynamicDialogRef) {
    }

    ngOnInit(): void {
        //set default data
        
            
        
            
        
            
        
            
        
            
        
            
        

        //edit vendor if requested by the row click
        if (this.config.data != null) {
            this.editVendor(this.config.data)
        }

    }


    save() {
        this.submitted = true

        //update if their is an objectId
        if (this.vendor.objectId) {
            this.subscription.add(
                this.vendorService.updateVendor(this.vendor).subscribe(() => {
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
        //else create vendor
        else {
            this.vendor.objectId = uuidv4();
            this.subscription.add(
                this.vendorService.createVendor(this.vendor).subscribe(() => {
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
        this.ref.close(this.vendor)
        this.submitted = false
        this.vendor = {}

    }

    //unsubscribe all the services
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    //edit vendor
    editVendor(vendor: VendorDto) {
        this.vendor = {...vendor};
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
