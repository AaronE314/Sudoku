import { Component, OnInit, Input } from '@angular/core';
import { PuzzleService } from '../puzzle.service';
import { Cell } from '../cell';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input() cell: Cell;

  constructor(private puzzleService: PuzzleService) { }

  ngOnInit() {
  }

  clickCell(): void {
    this.puzzleService.updateCellSelected(this.cell.i, this.cell.j, true);
  }

}
