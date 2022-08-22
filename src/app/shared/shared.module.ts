import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './modules/material.module';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
  ],
  exports: [
    FlexLayoutModule,
    MaterialModule,
  ],
  declarations: [],
  providers: [],
})
export class SharedModule { }