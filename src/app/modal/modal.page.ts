import { Component, OnInit, Input } from '@angular/core';
import { Note, ServiceService } from '../service.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id!: string; // Mark as definitely assigned

  note: Note | null = null; // Initialize as possibly null

  constructor(
    private serviceService: ServiceService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.serviceService.getNoteById(this.id).subscribe((res) => {
      this.note = res;
    });
  }

  async updateNote() {
    console.log('UpdateNote called');
    if (this.note) {
      console.log('Note found:', this.note);
      // Ensure note is not null
      await this.serviceService.updateNote(this.note);
      console.log('Note updated');
      const toast = await this.toastCtrl.create({
        message: 'Note updated',
        duration: 1000,
      });
      toast.present();
    } else {
      console.log('Note is null');
    }
  }

  async deleteNote() {
    if (this.note && this.note.id) {
      // Ensure note and note.id are not null or undefined
      await this.serviceService.deleteNoteById(this.note.id);
      this.modalCtrl.dismiss();
    }
  }
}
