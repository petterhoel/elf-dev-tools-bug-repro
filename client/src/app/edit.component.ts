import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ElfApi, ElfRepository} from "./elf-state/elf.repository";
import {Elf} from "./elf-state/elf";
import {tap} from "rxjs";

@Component({
  selector: 'app-edit',
  template: `
    <app-elf-list *ngIf="elves$ | async as elves" [elves]="elves" (elfSelected)="settAktiv($event)"></app-elf-list>
    <app-elf-form *ngIf="selectedElf$ | async as elf" [elf]="elf"></app-elf-form>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnInit{
  elves$ = this.repo.elf$;
  selectedElf$ = this.repo.selectedElf$.pipe(tap(console.log));
  constructor(private repo: ElfRepository, private api: ElfApi) {
  }

  ngOnInit(): void {
    this.api.getElves();
  }

  settAktiv(id: Elf['id']): void {
    this.repo.setActive(id);
  }
}
