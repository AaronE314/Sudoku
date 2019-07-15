import { Component, OnInit } from '@angular/core';
import { PuzzleService } from 'app/puzzle.service';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {

  constructor(private puzzleService: PuzzleService) { }

  ngOnInit() {
    this.puzzleService.loadPuzzle();
  }

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
