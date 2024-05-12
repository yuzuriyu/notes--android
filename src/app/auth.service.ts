import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id?: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private firestore: Firestore) {}

  async signIn(username: string, password: string): Promise<boolean> {
    try {
      const usersRef = collection(this.firestore, 'users');
      const q = query(
        usersRef,
        where('username', '==', username),
        where('password', '==', password)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size > 0) {
        // User exists
        return true;
      } else {
        // User does not exist
        return false;
      }
    } catch (error) {
      console.error('Error signing in: ', error);
      return false; // Return false in case of error
    }
  }
}
