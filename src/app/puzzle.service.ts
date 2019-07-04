import { Injectable } from '@angular/core';
import { Cell, HighlightLevel } from './cell';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

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
    this.http.get('./assets/puzzles.csv', { responseType: 'text' })
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
          selected: HighlightLevel.NO_HIGHLIGHT
        });
        this.solution[i].push({
          i,
          j,
          value: +puzzleString[1][i * 9 + j],
          notes: createNotes(),
          default: true,
          selected: HighlightLevel.NO_HIGHLIGHT
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
      }
    }

    if (this.puzzle[i][j].value !== 0) {
      for (const row of this.puzzle) {
        for (const cell of row) {
          const value = this.puzzle[i][j].value;
          if (cell.value !== 0 && cell.value === value) {
            cell.selected = selected;
          } else if (cell.value === 0 && cell.notes[Math.floor((value - 1) / 3)][(value - 1) % 3]) {
            cell.selected = HighlightLevel.GHOST_SELECTED;
          }

        }
      }
    } else {
      this.puzzle[i][j].selected = selected;
    }


  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(`${operation} failed: ${error.message}`);
      console.error(error);

      return of(result as T);
    };
  }

}
