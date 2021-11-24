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
      <button (click)="respawnClicked.emit()" class="tui-button orange-168">Respawn</button>
    </div>
    <table class="tui-table blue-168 hovered-cyan list" *ngIf="elves.length">
      <thead>
      <tr>
        <th>Name</th>
        <th>Can fight</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let elf of elves">
        <td>{{elf.name}}</td>
        <td>{{elf.canFight}}</td>
        <td class="buttons">
          <button class="tui-button cyan-168"
                  (click)="elfSelected.emit(elf.id)">edit
          </button>
          <button class="tui-button red-168"
                  (click)="elfDeleted.emit(elf.id)">x</button>
        </td>
      </tr>
      </tbody>
    </table>

  `,
  styles: [`
  .list td, th {
    padding: 1rem;
  }
  .buttons {
    display: flex;
    gap: .6rem;
  }
  `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElfListComponent {
  @Input() elves: Elf[] = [];
  @Output() elfSelected = new EventEmitter<Elf['id']>();
  @Output() elfDeleted = new EventEmitter<Elf['id']>();
  @Output() respawnClicked = new EventEmitter();
}
