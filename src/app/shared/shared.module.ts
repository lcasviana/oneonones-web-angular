import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShellComponent } from './components/shell/shell.component';
import { MaterialModule } from './modules/material.module';
import { ThemeService } from './services/theme.service';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  exports: [
    FlexLayoutModule,
    MaterialModule,
    ShellComponent,
  ],
  declarations: [
    ShellComponent,
  ],
  providers: [
    ThemeService,
  ],
})
export class SharedModule { }