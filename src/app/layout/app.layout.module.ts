import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { AppConfigModule } from './config/app.config.module';
import { AppLayoutComponent } from './app.layout.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { AppSidebarComponent } from './app.sidebar.component';
import { AppTopbarComponent } from './app.topbar.component';
import { AppProfileSidebarComponent } from './app.profilesidebar.component';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { DetailsComponent } from '../components/details/details.component';
import { MapComponent } from '../components/map/map.component';
import { StarterComponent } from '../components/starter/starter.component';
import { ButtonModule } from 'primeng/button';
import { SafeComponent } from '../components/details/message/safe/safe.component';
import { WarningComponent } from '../components/details/message/warning/warning.component';

@NgModule({
    declarations: [
        AppLayoutComponent,
        AppBreadcrumbComponent,
        AppSidebarComponent,
        AppTopbarComponent,
        AppProfileSidebarComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        HomeComponent,
        NavbarComponent,
        DetailsComponent,
        MapComponent,
        StarterComponent,
        SafeComponent,
        WarningComponent

    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        TooltipModule,
        RippleModule,
        RouterModule,
        AppConfigModule,
        ButtonModule

    ]
})
export class AppLayoutModule { }
