import { Component } from '@angular/core';

import { PuzzleService } from './puzzle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'sudoku';

  constructor(private puzzleService: PuzzleService) {}

  checkWin(): boolean {
    return this.puzzleService.checkWin();
  }

  newGame(): void {
    this.puzzleService.newGame();
  }

  cheat(): void {
    this.puzzleService.cheat();
  }

  changeDifficulty(): void {
    // TODO: ADD DIFFICUTLY
  }

  settings(): void {
    // TODO: ADD Settings
  }

}
