import {Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-menu',
    template: `
        <div class="menu">
            <ul class="layout-menu">
                <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

     model: any[] | undefined;

    ngOnInit() {
        this.model = [
            {
                // label: 'Dashboard',
                // icon: 'pi pi-fw pi-align-left',
                items: [
                    // Generated Pages
                    {label: 'Invoice', icon: 'pi pi-fw pi-home', routerLink: ['pages/invoice'] },
			{label: 'Product', icon: 'pi pi-fw pi-home', routerLink: ['pages/product'] },
			{label: 'Vendor', icon: 'pi pi-fw pi-home', routerLink: ['pages/vendor'] },
			// {label: 'Vendorproducts', icon: 'pi pi-fw pi-home', routerLink: ['pages/vendorproducts'] },
			// {label: 'Invoiceproduct', icon: 'pi pi-fw pi-home', routerLink: ['pages/invoiceproduct'] },

                    ]
            }
        ];
    }
}
