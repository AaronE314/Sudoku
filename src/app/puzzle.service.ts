import { Injectable } from '@angular/core';
import { Cell } from './cell';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  private puzzleUrl = 'api/heroes';

  constructor(
    private http: HttpClient
  ) { }

  getPuzzle(): Observable<Cell[]> {
    return this.http.get<Cell[]>(this.puzzleUrl).pipe(
      catchError(this.handleError<Cell[]>('getPuzzle', []))
    )
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
