import { Component, OnInit, HostListener } from '@angular/core';
import { PuzzleService } from '../puzzle.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  buttons: number[] = [];

  notes = false;

  constructor(private puzzleService: PuzzleService) { }

  ngOnInit() {

    for (let i = 1; i < 10; i++) {
      this.buttons.push(i);
    }

  }

  @HostListener('window:keydown', ['$event'])
  KeyboardEvent(event: KeyboardEvent) {

    if (parseInt(event.key, 10)) {
      this.clickButton(parseInt(event.key, 10));
    } else if (event.key.toLowerCase() === 'n') {
      this.toggleNotes();
    }
  }

  toggleNotes() {
    this.notes = !this.notes;
  }

  getNote(value: number) {
    return this.puzzleService.getSelected().notes[Math.floor((value - 1) / 3)][(value - 1) % 3];
  }

  clickButton(value: number) {

    if (this.notes) {
      this.puzzleService.toggleNoteToSelectedCell(value);
    } else {
      this.puzzleService.updateSelectedValue(value);
    }


  }

}
