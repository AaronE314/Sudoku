import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { PuzzleComponent } from './puzzle/puzzle.component';

const routes: Routes = [
  {path: '', redirectTo: '/puzzle', pathMatch: 'full'},
  {path: 'puzzle', component: PuzzleComponent},
  {path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
