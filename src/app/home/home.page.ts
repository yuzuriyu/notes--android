import { Component, OnInit } from '@angular/core';
import { ServiceService, Note } from '../service.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  notes: Note[] = []; // Initialize notes as an empty array of Note objects

  constructor(
    private serviceService: ServiceService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.serviceService.getNotes().subscribe((res: Note[]) => {
      this.notes = res; // Assign the array of Note objects returned from getNotes() to notes
    });
  }

  async openNote(note: Note) {
    console.log(note);
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: note.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5,
    });
    modal.present();
  }

  async addNote() {
    const alert = await this.alertCtrl.create({
      header: 'Add Record',
      inputs: [
        {
          name: 'title',
          placeholder: 'enter name',
          type: 'text',
        },
        {
          name: 'text',
          placeholder: 'enter details',
          type: 'textarea',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: (res) => {
            this.serviceService.addNote({ title: res.title, text: res.text });
          },
        },
      ],
    });
    await alert.present();
  }
}
