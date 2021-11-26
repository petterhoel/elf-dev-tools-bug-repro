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
import {createRequestsStatusOperator, updateRequestStatus, withRequestsStatus} from "@ngneat/elf-requests";

export interface ElfUI {
  id: string;
}

const { state, config } = createState(
  withEntities<Elf>(),
  withActiveId(),
  withRequestsStatus<`elf` | `elf-${string}`>());

const name = 'elf';
const store = new Store({ name, state, config });
const trackTodosRequestsStatus = createRequestsStatusOperator(store);

@Injectable({ providedIn: 'root' })
export class ElfRepository {
  public elf$ = store.pipe(selectAll());
  public selectedElf$ = store.pipe(selectActiveEntity())

  public setElf(elf: Elf[]) {
    store.update(
      setEntities(elf),
      updateRequestStatus(name, 'success')
      );
  }

  public trackElfRequestsStatus = trackTodosRequestsStatus;

  public addElf(elf: Elf) {
    store.update(addEntities(elf));
  }

  public setActive(id: Elf['id']): void {
    store.update(setActiveId(id))
  }

  public updateElf(id: Elf['id'], elf: Partial<Elf>) {
    store.update(updateEntities(id, elf));
  }

  public deleteElf(id: Elf['id']) {
    store.update(deleteEntities(id));
  }
}
