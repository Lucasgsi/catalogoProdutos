import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServidorPage } from './servidor';

@NgModule({
  declarations: [
    ServidorPage,
  ],
  imports: [
    IonicPageModule.forChild(ServidorPage),
  ],
})
export class ServidorPageModule {}
