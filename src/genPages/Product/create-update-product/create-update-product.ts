import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {v4 as uuidv4} from 'uuid';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Subscription} from "rxjs";
import {IProduct,ProductDto} from "../../../dto/Product.dto";
import {ProductService} from "../../../services/Product.service";

// @ts-ignore
@Component({
    selector: 'app-create-task',
    templateUrl: './create-update-product.html',

})
export class CreateUpdateProduct implements OnInit, OnDestroy {
    product: ProductDto = {};

    submitted: boolean = false;

    private subscription: Subscription = new Subscription();

    constructor(private productService: ProductService, private messageService: MessageService, public config: DynamicDialogConfig, public ref: DynamicDialogRef) {
    }

    ngOnInit(): void {
        //set default data
        
            
        
            
        
            
        
            
        
            
        
            
        

        //edit product if requested by the row click
        if (this.config.data != null) {
            this.editProduct(this.config.data)
        }

    }


    save() {
        this.submitted = true

        //update if their is an objectId
        if (this.product.objectId) {
            this.subscription.add(
                this.productService.updateProduct(this.product).subscribe(() => {
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
        //else create product
        else {
            this.product.objectId = uuidv4();
            this.subscription.add(
                this.productService.createProduct(this.product).subscribe(() => {
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
        this.ref.close(this.product)
        this.submitted = false
        this.product = {}

    }

    //unsubscribe all the services
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    //edit product
    editProduct(product: ProductDto) {
        this.product = {...product};
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
