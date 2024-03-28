import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root',
})
export class EmployerService {
    API_URL: string = 'https://localhost:7016/api/User/';

    constructor(private httpClient: HttpClient) {}

    assignCashiers(credentials: {
        managerId: string;
        cashierId: string;
        cashId: string;
    }) {
        let url =
            this.API_URL +
            credentials.managerId +
            '/assignCash/' +
            credentials.cashierId;
        console.log(url);
        console.log(credentials.managerId);
        console.log(credentials.cashierId);
        return this.httpClient.post<any>(url, { cashId: credentials.cashId });
    }

    getCashType() {
        let url: string = 'https://localhost:7016/api/Cash/';
        return this.httpClient.get<any>(url);
    }
}
