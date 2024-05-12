import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id?: string;
  username: string;
  password: string;
  fourDigitPassword: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  getUsers(): Observable<User[]> {
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, { idField: 'id' }).pipe(
      map((users: any[]) => {
        return users.map((user: any) => {
          return {
            id: user.id,
            username: user.username,
            password: user.password,
            fourDigitPassword: user.fourDigitPassword,
          };
        });
      })
    );
  }

  getUserById(id: string): Observable<User> {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return docData(userDocRef).pipe(
      map((user: any) => {
        return { id, ...user }; // Assign id to the user object
      })
    );
  }

  addUser(user: User) {
    const usersRef = collection(this.firestore, 'users');
    return addDoc(usersRef, user);
  }

  deleteUserById(id: string) {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return deleteDoc(userDocRef);
  }

  updateUser(user: User) {
    const userDocRef = doc(this.firestore, `users/${user.id}`);
    const { id, ...userWithoutId } = user; // Remove id from user object
    return updateDoc(userDocRef, userWithoutId);
  }
}
