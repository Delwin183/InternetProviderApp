import { ManagersComponent } from './components/manager/manager.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeComponent } from './components/employe/employe.component';
import { ClientComponent } from './components/client/client.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'cashier', component: ManagersComponent },
    { path: 'employe', component: EmployeComponent },
    { path: 'client', component: ClientComponent },
];
