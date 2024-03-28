import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [FormsModule, CommonModule, SidebarComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
    errorMessage: any;
    Cashiers: any = [];

    constructor(private UserService: UserService) {}
    ngOnInit(): void {
        let ls: any = window.localStorage.getItem('user');
        let user: any = JSON.parse(ls);
        console.log(user);
        if (user) {
            this.UserService.getCashiers().subscribe({
                next: (response: any) => {
                    // Manejar la respuesta del servidor
                    console.log(response);
                    this.Cashiers = response.filter(
                        (r: any) => r.userRole == user?.userRole
                    );
                },
                error: (error: any) => {
                    // Manejar los errores
                    if (error.status == 200) {
                    }
                    console.error(error);
                    this.errorMessage = error.error;
                },
            });
        } else {
            window.location.href = '/login';
        }
    }
}
