

import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import {AuthGuard} from "@auth0/auth0-angular";

// Generated Pages
import {InvoiceComponent} from "./../genPages/Invoice/Invoice.component";
import {ProductComponent} from "./../genPages/Product/Product.component";
import {VendorComponent} from "./../genPages/Vendor/Vendor.component";
import {VendorproductsComponent} from "./../genPages/Vendorproducts/Vendorproducts.component";
import {InvoiceproductComponent} from "./../genPages/Invoiceproduct/Invoiceproduct.component";
import { HomeComponent } from './components/home/home.component';
import { StarterComponent } from './components/starter/starter.component';


const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent ,
        children: [
            {path: 'home', component: HomeComponent },
            { path: '', component: StarterComponent },

           // Generated Pages
					// {path: 'pages/product', component: ProductComponent },
					// {path: 'pages/vendor', component: VendorComponent },
					// {path: 'pages/vendorproducts', component: VendorproductsComponent },
					// {path: 'pages/invoiceproduct', component: InvoiceproductComponent },

        ]
    },
    { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
