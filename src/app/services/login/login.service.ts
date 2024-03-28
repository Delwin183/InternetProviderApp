import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    API_URL: string = 'https://localhost:7016/api/Auth/login';

    constructor(private httpClient: HttpClient) {}

    login(credentials: { userName: string; password: string }) {
        return this.httpClient.post<any>(this.API_URL, credentials);
    }
}
