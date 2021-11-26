import {createState, Store} from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  selectActiveEntity,
  selectAll,
  setActiveId,
  setEntities,
  updateEntities,
  withActiveId,
  withEntities
} from '@ngneat/elf-entities';
import {Injectable} from '@angular/core';
import {Elf} from "./elf";

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
