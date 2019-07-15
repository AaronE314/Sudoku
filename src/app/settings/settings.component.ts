import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from 'app/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  options = [
    {key: this.settings.keys.remove_notes, text: 'Auto Remove Notes', value: '1', checked: true},
    {key: this.settings.keys.fill_notes, text: 'Auto Fill In Notes', value: '2', checked: false},
    {key: this.settings.keys.reject_wrong, text: 'Reject Wrong Input', value: '3', checked: false},
    {key: this.settings.keys.highlight, text: 'Highlight Notes', value: '4', checked: true},
    {key: this.settings.keys.multi_select, text: 'Multi Select', value: '5', checked: false},
  ];

  selected: string;

  constructor(
    private router: Router,
    private settings: SettingsService
  ) { }

  ngOnInit() {
    for (const option of this.options) {
      option.checked = (this.settings.getSetting(option.key) === 'true');
    }

    this.selected = this.settings.getSetting(this.settings.keys.difficulty);
  }

  goBack(): void {
    this.router.navigateByUrl('/puzzle');
  }

  getDiff(): string[] {
    return this.settings.difficulties;
  }

  getSettings(): SettingsService {
    return this.settings;
  }

  save(): void {

    for (const option of this.options) {
      this.settings.saveSetting(option.key, option.checked.toString());
    }

    this.settings.saveSetting(this.settings.keys.difficulty, this.selected);

    this.router.navigateByUrl('/puzzle');
  }

}
