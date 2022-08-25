import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OneononeMeetingComponent } from './components/oneonone-meeting/oneonone-meeting.component';
import { OneononeComponent } from './components/oneonone/oneonone.component';

const routes = [
  { path: '', component: OneononeComponent },
  { path: ':id', component: OneononeMeetingComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OneononeRoutingModule { }