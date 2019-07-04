import { Component, OnInit } from '@angular/core';
import { PuzzleService } from '../puzzle.service';
import { Cell } from '../cell';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  // grid: number[][] = [
  // [0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 9, 0, 2, 0, 0, 7, 0, 0],
  // [2, 1, 0, 5, 0, 0, 0, 0, 3],
  // [0, 8, 5, 0, 0, 4, 0, 0, 7],
  // [0, 0, 0, 1, 6, 0, 0, 0, 0],
  // [0, 0, 0, 0, 7, 0, 5, 0, 4],
  // [5, 3, 1, 4, 0, 9, 0, 7, 0],
  // [6, 4, 0, 0, 0, 2, 0, 0, 0],
  // [8, 0, 0, 0, 0, 0, 9, 0, 0]];

  grid: Cell[][] = [];

  constructor (private puzzleService: PuzzleService) { }

  ngOnInit() {

    this.puzzleService.loadPuzzle();

    this.grid = this.puzzleService.getPuzzle();

  }

}
