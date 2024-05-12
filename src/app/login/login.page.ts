import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async signIn() {
    try {
      const isUserExists = await this.authService.signIn(
        this.username,
        this.password
      );
      if (isUserExists) {
        console.log('User signed in successfully');
        // Store username in local storage
        localStorage.setItem('username', this.username);
        // Redirect to FourDigitAuthPage
        this.router.navigate(['/four-digit-auth']);
      } else {
        this.errorMessage = 'Incorrect username or password';
      }
    } catch (error) {
      console.error('Error signing in: ', error);
      // Handle sign-in error
    }
  }
}
