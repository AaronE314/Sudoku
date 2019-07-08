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
    } else {
      switch (event.key.toLowerCase()) {
        case 'n':
          this.toggleNotes();
          break;
        case 'w':
        case 'arrowup':
          this.puzzleService.shiftSelected(-1, 0);
          break;
        case 'a':
        case 'arrowleft':
          this.puzzleService.shiftSelected(0, -1);
          break;
        case 'd':
        case 'arrowright':
          this.puzzleService.shiftSelected(0, 1);
          break;
        case 's':
        case 'arrowdown':
          this.puzzleService.shiftSelected(1, 0);
          break;
    }
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
      this.puzzleService.checkWin();
    }
  }

}
