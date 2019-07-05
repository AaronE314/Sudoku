import { Component, OnInit, Input } from '@angular/core';
import { PuzzleService } from '../puzzle.service';
import { Cell, HighlightLevel, notHighlight, Status } from '../cell';

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

  highlightLevel() {
    return HighlightLevel;
  }

  status() {
    return Status;
  }


  clickCell(): void {
    this.puzzleService.updateCellSelected(this.cell.i, this.cell.j,
      (this.cell.value !== 0) ? notHighlight(this.cell.selected) : HighlightLevel.SELECTED );
  }

}
