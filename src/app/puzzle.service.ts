import { Injectable } from '@angular/core';
import { Cell } from './cell';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  private puzzleUrl = 'api/heroes';

  private puzzle: Cell[][] = [];
  private solution: Cell[][] = [];

  private fullData: string[] = [];

  constructor(
    private http: HttpClient
  ) { }

  loadPuzzle(): void {
    this.http.get('./assets/puzzles.csv', {responseType: 'text'})
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
    let puzzleText: string = this.fullData[Math.floor(Math.random()*this.fullData.length)];
            puzzleText = puzzleText.replace(/,\s*$/, "");

            const puzzleString: string[] = puzzleText.split(',');

            let notes: boolean[] = [];
            for (let i = 0; i < 9; i++) {
              notes.push(false);
            }

            console.log(puzzleString);

            for (let i = 0; i < 9; i++) {
              this.puzzle.push([]);
              this.solution.push([]);
              for (let j = 0; j < 9; j++) {
                this.puzzle[i].push({    
                  i: i,
                  j: j,
                  value: (puzzleString[0][i * 9 + j] === '.') ? 0 : +puzzleString[0][i * 9 + j],
                  notes: notes,
                  default: (puzzleString[0][i * 9 + j] === "." ? false : true),
                  selected: false})
                this.solution[i].push({    
                    i: i,
                    j: j,
                    value: +puzzleString[1][i * 9 + j],
                    notes: notes,
                    default: true,
                    selected: false})
              }
            }

            console.log(this.puzzle);
            console.log(this.solution);
  }

  getPuzzle(): Cell[][] {
    return this.puzzle;
  }

  getSolution(): Cell[][] {
    return this.solution;
  }

  updateCellValue(i: number, j: number, value: number): void {
    this.puzzle[i][j].value = value;
  }

  updateCellNotes(i: number, j: number, notes: boolean[]): void {
    this.puzzle[i][j].notes = notes;
  }

  updateCellSelected(i: number, j: number, selected: boolean): void {

    for (let k = 0; k < this.puzzle.length; k++) {
      for (let l = 0; l < this.puzzle[k].length; l++) {
        this.puzzle[k][l].selected = false;
      }
    }

    if (this.puzzle[i][j].default) {
      for (let k = 0; k < this.puzzle.length; k++) {
        for (let l = 0; l < this.puzzle[k].length; l++) {
          if (this.puzzle[k][l].value !== 0 && this.puzzle[k][l].value === this.puzzle[i][j].value) {
            this.puzzle[k][l].selected = true;
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
