import { Component, OnInit } from '@angular/core';
import { PuzzleService } from '../puzzle.service';
import { Cell } from '../cell';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  grid: Cell[][] = [];

  constructor(private puzzleService: PuzzleService) { }

  ngOnInit() {

    this.puzzleService.loadPuzzle();

    this.grid = this.puzzleService.getPuzzle();

  }
}
