import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {Elf} from "./elf-state/elf";

@Component({
  selector: 'app-elf-list',
  template: `
    <div class="tui-panel tui-shadow black-text" *ngIf="!elves?.length">
      <div class="tui-panel-header">
         alert
      </div>
      <div class="tui-panel-content white-168">
        Oh no - no elves
      </div>
    </div>
    <table class="tui-table" *ngIf="elves.length">
      <thead>
      <tr>
        <th>Name</th>
        <th>Can fight</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let elf of elves">
        <td>{{elf.name}}</td> <td>{{elf.canFight}}</td> <td><button>edit</button></td>
      </tr>
      </tbody>
    </table>

  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElfListComponent {
  @Input() elves: Elf[] = [];
  @Output() elfSelected = new EventEmitter<string>();
}
