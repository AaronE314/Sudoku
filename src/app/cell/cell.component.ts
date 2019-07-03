import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input() value: number;

  selected: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  clickCell(): void {
    this.selected = !this.selected;
  }

}
