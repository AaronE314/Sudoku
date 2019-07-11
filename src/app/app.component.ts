import { Component } from '@angular/core';

import { PuzzleService } from './puzzle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'sudoku';

  constructor() {}
}
