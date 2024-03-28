import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login/login.service';
import { FormsModule } from '@angular/forms';
import lottie from 'lottie-web';
import { defineElement } from '@lordicon/element';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent implements OnInit {
    userName: string = '';
    password: string = '';
    errorMessage: string = '';

    constructor(private loginService: LoginService) {
        defineElement(lottie.loadAnimation);
    }

    ngOnInit(): void {}

    login(): void {
        // Validar que los datos sean ingresados antes de consumir el servicio
        if (!this.userName || !this.password) {
            this.errorMessage =
                'Por favor ingrese el nombre de usuario y la contraseña.';
            return;
        }

        // Validar el formato del nombre de usuario
        if (!this.isValidUsername(this.userName)) {
            this.errorMessage =
                'El nombre de usuario debe tener entre 8 y 20 caracteres y contener al menos una letra y un número.';
            return;
        }

        // Validar el formato de la contraseña
        if (!this.isValidPassword(this.password)) {
            this.errorMessage =
                'La contraseña debe tener al menos 8 caracteres, incluyendo al menos un número y una letra mayúscula.';
            return;
        }

        // Consumir el servicio de inicio de sesión
        const credentials = {
            userName: this.userName,
            password: this.password,
        };
        this.loginService.login(credentials).subscribe({
            next: (response: any) => {
                // Manejar la respuesta del servidor
                console.log(response);
                window.location.href = '/home';
                window.localStorage.setItem('user', JSON.stringify(response));
            },
            error: (error: any) => {
                // Manejar los errores
                console.error(error);
                this.errorMessage = error.error;
            },
        });
    }

    // Método para validar el formato del nombre de usuario
    private isValidUsername(username: string): boolean {
        return /^[A-Za-z0-9]{8,20}$/.test(username);
    }

    // Método para validar el formato de la contraseña
    private isValidPassword(password: string): boolean {
        return /^(?=.*\d)(?=.*[A-Z]).{8,30}$/.test(password);
    }
}
