import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FourDigitAuthPageRoutingModule } from './four-digit-auth-routing.module';

import { FourDigitAuthPage } from './four-digit-auth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FourDigitAuthPageRoutingModule
  ],
  declarations: [FourDigitAuthPage]
})
export class FourDigitAuthPageModule {}
