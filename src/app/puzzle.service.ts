import { Injectable } from '@angular/core';
import { Cell, HighlightLevel, Status } from './cell';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  private puzzle: Cell[][] = [];
  private solution: Cell[][] = [];

  private fullData: string[] = [];

  constructor(
    private http: HttpClient
  ) { }

  loadPuzzle(): void {
    this.http.get('./assets/puzzles/easy.csv', { responseType: 'text' })
      .subscribe(
        data => {
          this.fullData = data.split('\n');
          this.fullData.shift();
          this.getRandomPuzzle();
        },
        error => {
          console.log(error);
        }
      );
  }

  getRandomPuzzle() {
    let puzzleText: string = this.fullData[Math.floor(Math.random() * this.fullData.length)];
    puzzleText = puzzleText.replace(/,\s*$/, '');

    const puzzleString: string[] = puzzleText.split(',');

    const createNotes = (): boolean[][] => {
      const notes: boolean[][] = [];
      for (let i = 0; i < 3; i++) {
        notes.push([]);
        for (let j = 0; j < 3; j++) {
          notes[i].push(false);
        }
      }
      return notes;
    };

    let s = '';
    for (let i = 1; i <= puzzleString[1].length; i++) {
      s += puzzleString[1][i - 1];

      if (i !== 0 && i % 9 === 0 ) {
        s += '\n';
      } else if (i !== 0 && i % 3 === 0) {
        s += ' ';
      }
      if (i !== 0 && i % 27 === 0 ) {
        s += '\n';
      }
    }
    console.log(s);


    for (let i = 0; i < 9; i++) {
      this.puzzle.push([]);
      this.solution.push([]);
      for (let j = 0; j < 9; j++) {
        this.puzzle[i].push({
          i,
          j,
          value: (puzzleString[0][i * 9 + j] === '.') ? 0 : +puzzleString[0][i * 9 + j],
          notes: createNotes(),
          default: (puzzleString[0][i * 9 + j] === '.' ? false : true),
          selected: HighlightLevel.NO_HIGHLIGHT,
          greyedOut: false,
          status: Status.NORMAL
        });
        this.solution[i].push({
          i,
          j,
          value: +puzzleString[1][i * 9 + j],
          notes: createNotes(),
          default: true,
          selected: HighlightLevel.NO_HIGHLIGHT,
          greyedOut: false,
          status: Status.NORMAL
        });
      }
    }
  }

  getSelected(): Cell {
    for (const row of this.puzzle) {
      for (const cell of row) {

        if (!cell.default && cell.selected === HighlightLevel.SELECTED) {
          return cell;
        }

      }
    }
  }

  shiftSelected(up: number, right: number) {
    for (const row of this.puzzle) {
      for (const cell of row) {
        if (cell.selected === HighlightLevel.SELECTED) {
          if (cell.i + up >= 0 && cell.i + up < 9 && cell.j + right >= 0 && cell.j + right < 9) {
            this.updateCellSelected(cell.i + up, cell.j + right, HighlightLevel.SELECTED);
            return;
          }
        }
      }
    }
  }

  checkWin(): boolean {

    for (let i = 0; i < this.puzzle.length; i++) {
      for (let j = 0; j < this.puzzle[i].length; j++) {

        if ( this.puzzle[i][j].value === 0 || this.puzzle[i][j].value !== this.solution[i][j].value) {
          return false;
        }
      }
    }

    console.log('You Win!');
    return true;

  }

  validatePuzzle(): void {

    for (const row of this.puzzle) {
      for (const cell of row) {

        if (!this.validateBox(cell) || !this.validateCol(cell) || !this.validateRow(cell)) {
          cell.status = Status.INCORRECT;
        } else {
          cell.status = Status.NORMAL;
        }
      }
    }

  }

  validateBox(cell: Cell, highlight: boolean = false): boolean {

    const row = Math.floor((cell.i / 3)) * 3;
    const col = Math.floor((cell.j / 3)) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!highlight && this.puzzle[row + i][col + j] !== cell && this.puzzle[row + i][col + j].value === cell.value) {
          return false;
        }
        if (highlight) {
          this.puzzle[row + i][col + j].greyedOut = true;
        }
      }
    }

    return true;

  }

  validateRow(cell: Cell, highlight: boolean = false): boolean {
    for (let row = 0; row < this.puzzle.length; row++) {
      if (!highlight && this.puzzle[cell.i][row] !== cell && this.puzzle[cell.i][row].value === cell.value) {
        return false;
      }
      if (highlight) {
        this.puzzle[cell.i][row].greyedOut = true;
      }
    }
    return true;
  }

  validateCol(cell: Cell, highlight: boolean = false): boolean {

    for (const col of this.puzzle) {
      if (!highlight && col[cell.j] !== cell && col[cell.j].value === cell.value) {
        return false;
      }
      if (highlight) {
        col[cell.j].greyedOut = true;
      }
    }
    return true;

  }

  getPuzzle(): Cell[][] {
    return this.puzzle;
  }

  getSolution(): Cell[][] {
    return this.solution;
  }

  updateSelectedValue(value: number) {

    const cell = this.getSelected();

    if (cell) {
      cell.value = (value === cell.value) ? 0 : value;

      this.validatePuzzle();
      this.updateCellSelected(cell.i, cell.j, HighlightLevel.SELECTED);
    }

  }

  toggleNoteToSelectedCell(value: number) {

    const cell = this.getSelected();

    if (cell) {
      value -= 1;

      cell.notes[Math.floor(value / 3)][value % 3] = !cell.notes[Math.floor(value / 3)][value % 3];

      this.updateCellSelected(cell.i, cell.j, HighlightLevel.SELECTED);
    }

  }
  updateCellValue(i: number, j: number, value: number): void {
    this.puzzle[i][j].value = value;
  }

  updateCellNotes(i: number, j: number, notes: boolean[][]): void {
    this.puzzle[i][j].notes = notes;
  }

  updateCellSelected(i: number, j: number, selected: HighlightLevel): void {

    for (const row of this.puzzle) {
      for (const cell of row) {
        cell.selected = HighlightLevel.NO_HIGHLIGHT;
        cell.greyedOut = false;
      }
    }

    if (this.puzzle[i][j].value !== 0 && selected === HighlightLevel.SELECTED) {
      for (const row of this.puzzle) {
        for (const cell of row) {
          const value = this.puzzle[i][j].value;
          if (cell.value !== 0 && cell.value === value) {
            cell.selected = HighlightLevel.HIGHLIGHTED;
          } else if (cell.value === 0 && cell.notes[Math.floor((value - 1) / 3)][(value - 1) % 3]) {
            cell.selected = HighlightLevel.GHOST_SELECTED;
          }
        }
      }
    }

    this.puzzle[i][j].selected = selected;

    if (selected === HighlightLevel.SELECTED) {
      this.validateBox(this.puzzle[i][j], true);
      this.validateCol(this.puzzle[i][j], true);
      this.validateRow(this.puzzle[i][j], true);
    }
  }

}
