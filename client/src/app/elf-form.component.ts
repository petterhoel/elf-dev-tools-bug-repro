import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  EventEmitter,
  Output
} from '@angular/core';
import {Elf, ElfBase} from "./elf-state/elf";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-elf-form',
  template: `
    <form #elfForm="ngForm"
          (ngSubmit)="submit(elfForm)"
          class="tui-window">
      <fieldset class="tui-fieldset">
        <legend class="center">{{_formElf.id ? _formElf.name : 'New elf'}}</legend>
        <input type="text"
               class="tui-input"
               required
               [ngModel]="_formElf.name" name="name">
      </fieldset>

      <fieldset class="tui-input-fieldset">
        <legend>Can fight?</legend>
        <label class="tui-radio">Yes
          <input
            type="radio"
            name="canFight"
            [ngModel]="_formElf.canFight"
            [value]="true"/>
          <span></span>
        </label>
        <label class="tui-radio">No
          <input
            type="radio"
            name="canFight"
            [ngModel]="_formElf.canFight"
            [value]="false"/>
          <span></span>
        </label>
      </fieldset>
      <button type="submit" class="tui-button">Save Elf</button>
    </form>
  `,
  styles: [`
    form {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: .6rem;
    }
  `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElfFormComponent {
  _formElf: ElfBase = { name: '', canFight: false, id: '' };
  @Output() submitted = new EventEmitter<ElfBase>();

  @Input() set elf(elf : ElfBase) {
    this._formElf = elf;
  }

  submit(form: NgForm): void {
    const {name, canFight } = form.value;
    const { id } = this._formElf;
    this.submitted.emit({id, name, canFight})
  }
}
