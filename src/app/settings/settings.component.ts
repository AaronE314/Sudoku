import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  options = [
    {key: 'setting/remove_notes', text: 'Auto Remove Notes', value: '1', checked: true},
    {key: 'setting/fill_notes', text: 'Auto Fill In Notes', value: '2', checked: false},
    {key: 'setting/reject_wrong', text: 'Reject Wrong Input', value: '3', checked: false},
    {key: 'setting/highlight', text: 'Highlight Notes', value: '4', checked: true},
    {key: 'setting/multi_select', text: 'Multi Select', value: '5', checked: false},
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goBack(): void {  
    this.router.navigateByUrl('/puzzle');
  }

  save(): void {

    for (const option of this.options) {
      localStorage.setItem(option.key, option.checked.toString());
    }

    this.router.navigateByUrl('/puzzle');
  }

}
