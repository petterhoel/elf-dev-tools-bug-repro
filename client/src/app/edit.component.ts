import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ElfRepository} from "./elf-state/elf.repository";
import {Elf, ElfBase} from "./elf-state/elf";
import {tap} from "rxjs";
import {ElfApi} from "./elf-state/elf-api.service";

@Component({
  selector: 'app-edit',
  template: `
    <app-elf-list *ngIf="elves$ | async as elves"
                  [elves]="elves"
                  (elfSelected)="settAktiv($event)"
                  (elfDeleted)="slett($event)"
                  (respawnClicked)="respawn()"></app-elf-list>
    <app-elf-form *ngIf="selectedElf$ | async as elf"
                  [elf]="elf"
                  (submitted)="lagre($event)"></app-elf-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnInit{
  elves$ = this.repo.elf$;
  selectedElf$ = this.repo.selectedElf$.pipe(tap(console.log));
  constructor(
    private repo: ElfRepository,
    private api: ElfApi) {}

  ngOnInit(): void {
    this.api.getElves();
  }

  lagre(elf: ElfBase): void {
    this.api.lagre(elf);
  }

  respawn(): void {
    this.api.respawn();
  }

  slett(id: Elf['id']): void {
    this.api.slett(id);
  }

  settAktiv(id: Elf['id']): void {
    this.api.settAktiv(id);
  }
}
