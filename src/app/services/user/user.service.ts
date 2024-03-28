import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    API_URL: string = 'https://localhost:7016/api/User';

    constructor(private httpClient: HttpClient) {}

    getCashiers() {
        return this.httpClient.get<any>(this.API_URL);
    }
}
