import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Elf, ElfBase} from "./elf-state/elf";

@Component({
  selector: 'app-elf-form',
  template: `
    {{ _formElf.name }}
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElfFormComponent implements OnInit {

  _formElf: ElfBase = { name: '', canFight: false, id: '' };

  @Input() set elf(elf : ElfBase) {
    this._formElf = elf;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
