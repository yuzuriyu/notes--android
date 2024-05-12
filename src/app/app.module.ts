import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'crud-57339',
        appId: '1:891796783407:web:e70a77b5c97c47ad8621da',
        storageBucket: 'crud-57339.appspot.com',
        apiKey: 'AIzaSyCcfU0iYJiak1tS17U1baG0tJHl6k1U89o',
        authDomain: 'crud-57339.firebaseapp.com',
        messagingSenderId: '891796783407',
        measurementId: 'G-QZZKH42RNV',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
