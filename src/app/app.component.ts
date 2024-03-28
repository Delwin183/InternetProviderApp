import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PrimeNGConfig } from 'primeng/api';
import { HomeComponent } from './components/home/home.component';
import { EmployeComponent } from './components/employe/employe.component';
import { ClientComponent } from './components/client/client.component';
import { ManagersComponent } from './components/manager/manager.component';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        LoginComponent,
        SidebarComponent,
        HomeComponent,
        EmployeComponent,
        ClientComponent,
        ManagersComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    title = 'InternetProviderApp';

    constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
