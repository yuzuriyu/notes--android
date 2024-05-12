import { Component } from '@angular/core';
import { UserService, User } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  username: string = '';
  password: string = '';
  fourDigitPassword: string = '';

  constructor(private userService: UserService, private router: Router) {}

  signUp() {
    const newUser: User = {
      username: this.username,
      password: this.password,
      fourDigitPassword: this.fourDigitPassword,
    };

    this.userService
      .addUser(newUser)
      .then(() => {
        console.log('User added successfully');
        // Redirect to login page or any other page as needed
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Error adding user: ', error);
      });
  }
}
