import { Component, OnInit } from '@angular/core';
import { PuzzleService } from '../puzzle.service';
import { Cell } from '../cell';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  grid: Cell[][] = [];

  constructor(private puzzleService: PuzzleService) { }

  ngOnInit() {

    this.puzzleService.loadPuzzle();

    this.grid = this.puzzleService.getPuzzle();

  }

}
