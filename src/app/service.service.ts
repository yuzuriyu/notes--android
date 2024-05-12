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

export interface Note {
  id?: string;
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private firestore: Firestore) {}

  getNotes(): Observable<Note[]> {
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef, { idField: 'id' }).pipe(
      map((notes: any[]) => {
        return notes.map((note: any) => {
          return {
            id: note.id,
            title: note.title,
            text: note.text,
          };
        });
      })
    );
  }

  getNoteById(id: string): Observable<Note> {
    const noteDocRef = doc(this.firestore, `notes/${id}`);
    return docData(noteDocRef).pipe(
      map((note: any) => {
        return { id, ...note }; // Assign id to the note object
      })
    );
  }

  addNote(note: Note) {
    const notesRef = collection(this.firestore, 'notes');
    return addDoc(notesRef, note);
  }

  deleteNoteById(id: string) {
    const noteDocRef = doc(this.firestore, `notes/${id}`);
    return deleteDoc(noteDocRef);
  }

  updateNote(note: Note) {
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    const { id, ...noteWithoutId } = note; // Remove id from note object
    return updateDoc(noteDocRef, noteWithoutId);
  }
}
