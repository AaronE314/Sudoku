import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CellComponent } from './cell/cell.component';
import { HttpClientModule  } from '@angular/common/http';
import { ButtonsComponent } from './buttons/buttons.component';
import { BoardComponent } from './board/board.component';
import { SettingsComponent } from './settings/settings.component';
import { PuzzleComponent } from './puzzle/puzzle.component';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    ButtonsComponent,
    BoardComponent,
    SettingsComponent,
    PuzzleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
