import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CodemirrorModule } from '@ctrl/ngx-codemirror'
import { AppMaterialModule } from '../app.material.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CodemirrorModule,
    AppMaterialModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
