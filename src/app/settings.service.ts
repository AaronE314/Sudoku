import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  keys =  {
    remove_notes: 'setting/remove_notes',
    fill_notes: 'setting/fill_notes',
    reject_wrong: 'setting/reject_wrong',
    highlight: 'setting/highlight',
    multi_select: 'setting/multi_select',
    difficulty: 'setting/difficulty'
  };

  defaults =  {
    remove_notes: 'true',
    fill_notes: 'false',
    reject_wrong: 'false',
    highlight: 'true',
    multi_select: 'false',
    difficulty: 'easy'
  };

  difficulties = [
    'Simple',
    'Easy',
    'Intermediate',
    'Expert'
  ];


  constructor() { }

  saveSetting(name: string, value: string) {

    localStorage.setItem(name, value);

  }

  setDefault(): void {

    const keyVals = Object.values(this.keys);
    const defaultVals = Object.values(this.defaults);

    for (let i = 0; i < keyVals.length; i++) {
      this.saveSetting(keyVals[i], defaultVals[i]);
    }
  }

  getSetting(name: string): string {
    return localStorage.getItem(name);
  }

  isSet(name: string): boolean {
    return localStorage.getItem(name) !== null;
  }

}
