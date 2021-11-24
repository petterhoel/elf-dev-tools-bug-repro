import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ElfApi, ElfRepository} from "./elf-state/elf.repository";

@Component({
  selector: 'app-edit',
  template: `
    <app-elf-list *ngIf="elves$ | async as elves" [elves]="elves"></app-elf-list>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnInit{
  elves$ = this.repo.elf$
  constructor(private repo: ElfRepository, private api: ElfApi) {
  }

  ngOnInit(): void {
    this.api.getElves();
  }
}
