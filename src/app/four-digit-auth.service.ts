import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FourDigitAuthService {
  constructor(private firestore: Firestore) {}

  async verifyFourDigitPassword(
    userId: string,
    fourDigitPassword: string
  ): Promise<string[]> {
    try {
      const usersRef = collection(this.firestore, 'users');
      const q = query(
        usersRef,
        where('userId', '==', userId),
        where('fourDigitPassword', '==', fourDigitPassword)
      );
      const querySnapshot = await getDocs(q);

      const matchingDocIds: string[] = [];
      querySnapshot.forEach((doc) => {
        matchingDocIds.push(doc.id);
      });

      return matchingDocIds; // Return an array of document IDs
    } catch (error) {
      console.error('Error verifying four-digit password: ', error);
      return []; // Return an empty array in case of error
    }
  }
}
