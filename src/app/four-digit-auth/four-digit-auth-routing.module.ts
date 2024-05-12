import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FourDigitAuthPage } from './four-digit-auth.page';

const routes: Routes = [
  {
    path: '',
    component: FourDigitAuthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FourDigitAuthPageRoutingModule {}
