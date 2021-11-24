import { Store, createState } from '@ngneat/elf';
import {
  withEntities,
  selectAll,
  setEntities,
  addEntities,
  updateEntities,
  deleteEntities,
  withUIEntities,
  withActiveId, setActiveId, selectActiveEntity
} from '@ngneat/elf-entities';
import { withRequestsStatus } from '@ngneat/elf-requests';
import { Injectable } from '@angular/core';
import {Elf, ElfBase} from "./elf";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

export interface ElfUI {
  id: string;
}



const { state, config } = createState(withEntities<Elf>(), withActiveId());
const store = new Store({ name: 'elf', state, config });

@Injectable({ providedIn: 'root' })
export class ElfRepository {
  elf$ = store.pipe(selectAll());
  selectedElf$ = store.pipe(selectActiveEntity())

  setElf(elf: Elf[]) {
    store.update(setEntities(elf));
  }

  addElf(elf: Elf) {
    store.update(addEntities(elf));
  }

  setActive(id: Elf['id']): void {
    store.update(setActiveId(id))
  }

  updateElf(id: Elf['id'], elf: Partial<Elf>) {
    store.update(updateEntities(id, elf));
  }

  deleteElf(id: Elf['id']) {
    store.update(deleteEntities(id));
  }
}


@Injectable({ providedIn: 'root' })
export class ElfApi
{
  url = 'https://localhost:7114/elf'
  constructor(private http: HttpClient, private repo: ElfRepository) {}

  getElves(): void {
    this.http
      .get<Elf[]>(this.url)
      .pipe(
        tap(this.repo.setElf)
      )
      .subscribe();
  }

  lagre(elf: ElfBase): void {
    this.http
      .post<Elf>(this.url, elf)
      .pipe(
        tap(elfFromApi => this.repo.updateElf(elfFromApi.id, elfFromApi))
      )
      .subscribe()
  }

  settAktiv(id: Elf['id']): void {
    this.repo.setActive(id);
  }
}
