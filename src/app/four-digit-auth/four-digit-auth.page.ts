import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-four-digit-auth',
  templateUrl: './four-digit-auth.page.html',
  styleUrls: ['./four-digit-auth.page.scss'],
})
export class FourDigitAuthPage {
  fourDigitCode: string = '';
  errorMessage: string = ''; // Variable to store error message

  constructor(private firestore: Firestore, private router: Router) {}

  async submitCode() {
    try {
      // Retrieve username from local storage
      const username = localStorage.getItem('username');
      if (username) {
        // Fetch user data from Firestore based on username
        const userData = await this.fetchUserData(username);
        if (userData && userData.fourDigitPassword === this.fourDigitCode) {
          // Four-digit code matches, redirect to the home page
          console.log('Four-digit code is correct');
          this.router.navigate(['/home']);
        } else {
          // Set error message for incorrect code input
          this.errorMessage = 'Incorrect code. Please try again.';
        }
      } else {
        // Handle case where username is not available
        console.error('Username is not available.');
      }
    } catch (error) {
      console.error('Error submitting code:', error);
      // Handle error, such as displaying an error message to the user
    }
  }

  async fetchUserData(username: string): Promise<any> {
    try {
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // User found, retrieve user data
        return querySnapshot.docs[0].data();
      } else {
        // User not found
        this.errorMessage = 'User not found';
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      this.errorMessage = 'Error fetching user data';
      return null;
    }
  }
}
