import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CashierService } from '../../services/cashier/cashier.service';

@Component({
    selector: 'app-cashiers',
    standalone: true,
    imports: [FormsModule, CommonModule, SidebarComponent],
    templateUrl: './manager.component.html',
    styleUrl: './manager.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ManagersComponent {
    type: any;
    CashierAssignments: any[] = [];
    addType(arg0: any) {
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
                    // Procesar las asignaciones de cajas
                    this.CashierAssignments = this.processAssignments(response);
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

    openModal(content: any, userId: any) {
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

    AssignCash() {
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
                // Recargar la información de las cajas y sus asignaciones
                this.loadCashierType();
            },
            error: (error: any) => {
                // Manejar los errores
                if (error.status == 200) {
                    this.modalService.dismissAll();
                    // Recargar la información de las cajas y sus asignaciones
                    this.loadCashierType();
                }
                console.error(error);
                this.errorMessage = error.error;
            },
        });
    }

    processAssignments(cashiers: any[]): any[] {
        let assignments: any[] = [];
        if (cashiers && cashiers.length > 0) {
            cashiers.forEach((cashier) => {
                if (
                    cashier &&
                    cashier.assignedTo &&
                    cashier.assignedTo.length > 0
                ) {
                    cashier.assignedTo.forEach((assignment: any) => {
                        assignments.push({
                            cashNumber: cashier.cashNumber,
                            assignedTo: assignment,
                        });
                    });
                }
            });
        }
        return assignments;
    }

    loadCashierType() {
        this.CashierService.getCashType().subscribe({
            next: (response: any) => {
                // Manejar la respuesta del servidor
                console.log(response);
                this.Cashierstype = response;
            },
            error: (error: any) => {
                // Manejar los errores
                console.error(error);
                this.errorMessage = error.error;
            },
        });
    }
}
