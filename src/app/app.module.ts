import { NgModule } from '@angular/core';
import {CommonModule, DatePipe, HashLocationStrategy, LocationStrategy} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import {TableModule} from 'primeng/table';
import {ProgressBarModule} from "primeng/progressbar";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import {ToastModule} from "primeng/toast";
import {EditorModule} from "primeng/editor";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {AutoCompleteModule} from "primeng/autocomplete";
import {DialogService, DynamicDialogConfig} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {InputNumberModule} from "primeng/inputnumber";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {PasswordModule} from "primeng/password";
import {RadioButtonModule} from "primeng/radiobutton";
import {AuthHttpInterceptor, AuthModule, AuthService} from '@auth0/auth0-angular';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {environment} from "../environments/environment";

// Generated Pages
import {InvoiceComponent} from "../genPages/Invoice/Invoice.component";
import {ProductComponent} from "../genPages/Product/Product.component";
import {VendorComponent} from "../genPages/Vendor/Vendor.component";
import {VendorproductsComponent} from "../genPages/Vendorproducts/Vendorproducts.component";
import {InvoiceproductComponent} from "../genPages/Invoiceproduct/Invoiceproduct.component";

import {CreateUpdateInvoice} from "./../genPages/Invoice/create-update-invoice/create-update-invoice";
import {CreateUpdateProduct} from "./../genPages/Product/create-update-product/create-update-product";
import {CreateUpdateVendor} from "./../genPages/Vendor/create-update-vendor/create-update-vendor";
import {CreateUpdateVendorproducts} from "./../genPages/Vendorproducts/create-update-vendorproducts/create-update-vendorproducts";
import {CreateUpdateInvoiceproduct} from "./../genPages/Invoiceproduct/create-update-invoiceproduct/create-update-invoiceproduct";


// Generated Services
import {InvoiceService} from "../services/Invoice.service";
import {ProductService} from "../services/Product.service";
import {VendorService} from "../services/Vendor.service";
import {VendorproductsService} from "../services/Vendorproducts.service";
import {InvoiceproductService} from "../services/Invoiceproduct.service";
import {DropdownModule} from "primeng/dropdown";
import { CheckboxModule } from 'primeng/checkbox';
import {ChipModule} from "primeng/chip";

@NgModule({
    imports: [

        AppRoutingModule,
        AppLayoutModule,
        TableModule,
        DatePipe,
        ProgressBarModule,
        CommonModule,
        RippleModule,
        ButtonModule,
        InputTextModule,
        DialogModule,
        ToastModule,
        EditorModule,
        FormsModule,
        CalendarModule,
        AutoCompleteModule,
        InputNumberModule,
        ConfirmDialogModule,
        PasswordModule,
        RadioButtonModule,
        DropdownModule,
        CheckboxModule,
        ChipModule,

        // Import the module into the application, with configuration

    ],
    declarations: [

        AppComponent,


        // Generated Pages
        InvoiceComponent,
		ProductComponent,
		VendorComponent,
		VendorproductsComponent,
		InvoiceproductComponent,

        CreateUpdateInvoice,
CreateUpdateProduct,
CreateUpdateVendor,
CreateUpdateVendorproducts,
CreateUpdateInvoiceproduct,

    ],
    providers: [

        {provide: LocationStrategy, useClass: HashLocationStrategy},
        DialogService,MessageService,ConfirmationService,
        // Generated Services
        InvoiceService,
		ProductService,
		VendorService,
		VendorproductsService,
		InvoiceproductService,
        DynamicDialogConfig,


    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
