import { Component } from '@angular/core';

import { PuzzleService } from './puzzle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'sudoku';
  timeLeft: number = 60;
  interval: any;

  constructor(private puzzleService: PuzzleService) {}


  startTimer() {
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.timeLeft = 60;
        }
      },1000)
    }

  pauseTimer() {
    clearInterval(this.interval);
  }

  checkWin(): boolean {
    return this.puzzleService.checkWin();
  }

  newGame(): void {
    this.puzzleService.newGame();
    this.startTimer();
  }

  cheat(): void {
    this.puzzleService.cheat();
  }

  changeDifficulty(): void {
    // TODO: ADD DIFFICUTLY
  }

  settings(): void {
    // TODO: ADD DIFFICUTLY
  }

}
