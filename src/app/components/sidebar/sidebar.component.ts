import { CommonModule } from '@angular/common';
import { AppComponent } from './../../app.component';
import {
    Component,
    inject,
    Input,
    CUSTOM_ELEMENTS_SCHEMA,
    OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-offcanvas-content',
    standalone: true,
    imports: [FormsModule, CommonModule],
    styleUrl: './sidebar.component.css',

    template: `
        <div class="offcanvas-header">
            <h5 class="offcanvas-title">Menu</h5>
            <button
                type="button"
                class="btn-close text-reset"
                aria-label="Close"
                (click)="activeOffcanvas.dismiss('Cross click')"
            ></button>
        </div>
        <div class="offcanvas-body">
            <div>Hello {{ name }}</div>
            <button
                type="button"
                class="btn btn-outline-dark"
                (click)="logOut()"
            >
                Log Out
            </button>
            <button
                type="button"
                class="btn btn-outline-dark"
                (click)="redirectCashiers()"
            >
                {{ userRole }}
            </button>
            <button
                *ngIf="userRole === 'Cashier'"
                type="button"
                class="btn btn-outline-dark"
                (click)="redirect()"
            >
                Add CLient
            </button>
        </div>
    `,
    styles: `
		/* Opening offcanvas as a component requires this style in order to scroll */
		:host {
			height: 100%;
			display: flex;
			flex-direction: column;
		}
	`,
})
export class NgbdOffcanvasContent implements OnInit {
    userRole: string = '';
    ngOnInit(): void {
        let ls: any = window.localStorage.getItem('user');
        let user: any = JSON.parse(ls);
        if (user) {
            if (user.userRole == 'Cashier') {
                this.userRole = 'Employe'; // Si el usuario es un cajero
            } else if (user.userRole == 'Manager') {
                this.userRole = 'Cashier'; // Si el usuario es un gerente
            }
        }
    }
    activeOffcanvas = inject(NgbActiveOffcanvas);
    @Input() name: string = '';

    logOut() {
        window.localStorage.removeItem('user');
        window.location.href = '/login';
    }

    redirectCashiers() {
        let ls: any = window.localStorage.getItem('user');
        let user: any = JSON.parse(ls);
        if (user.userRole == 'Manager') {
            window.location.href = '/cashier';
        }
        if (user.userRole == 'Cashier') window.location.href = '/employe';
    }
    redirect() {
        window.location.href = '/client';
    }
}

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SidebarComponent {
    private offcanvasService = inject(NgbOffcanvas);

    open() {
        let ls: any = window.localStorage.getItem('user');
        let user: any = JSON.parse(ls);
        const offcanvasRef = this.offcanvasService.open(NgbdOffcanvasContent);
        offcanvasRef.componentInstance.name = user.userName;
    }
}
