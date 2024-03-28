import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CashierService } from '../../services/cashier/cashier.service';

@Component({
    selector: 'app-employe',
    standalone: true,
    imports: [FormsModule, CommonModule, SidebarComponent],
    templateUrl: './employe.component.html',
    styleUrl: './employe.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmployeComponent {
    type: any;
    AssingType(arg0: any) {
        this.type = arg0;
    }
    errorMessage: any;
    Cashiers: any = [];
    cashierId: any;
    managerId: any;
    Cashierstype: any;

    constructor(
        private UserService: UserService,
        public modalService: NgbModal,
        private CashierService: CashierService
    ) {}

    ngOnInit(): void {
        let ls: any = window.localStorage.getItem('user');
        let user: any = JSON.parse(ls);
        this.managerId = user.userId;
        console.log(user);
        if (user) {
            this.UserService.getCashiers().subscribe({
                next: (response: any) => {
                    // Manejar la respuesta del servidor
                    console.log(response);
                    this.Cashiers = response.filter(
                        (r: any) => r.userRole == 'Cashier'
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
            this.CashierService.getCashType().subscribe({
                next: (response: any) => {
                    // Manejar la respuesta del servidor
                    console.log(response);
                    this.Cashierstype = response;
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

    abrirModal(content: any, userId: any) {
        // Abre el modal solo si hay un archivo
        this.cashierId = userId;
        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
            .result.then(
                (result) => {
                    console.log(userId);
                },
                (reason) => {
                    // Código que se ejecuta cuando se cierra el modal
                }
            );
    }

    AsingCash() {
        const credentials = {
            managerId: this.managerId,
            cashierId: this.cashierId,
            cashId: this.type,
        };
        this.CashierService.assignCashiers(credentials).subscribe({
            next: (response: any) => {
                // Manejar la respuesta del servidor
                console.log(response);
                this.modalService.dismissAll();
            },
            error: (error: any) => {
                // Manejar los errores
                if (error.status == 200) {
                    console.log(error);
                    this.modalService.dismissAll();
                }
                console.error(error);
                this.errorMessage = error.error;
            },
        });
    }
}
