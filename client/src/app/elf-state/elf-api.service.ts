import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Elf, ElfBase} from "./elf";
import {map, tap} from "rxjs/operators";
import {filterNil} from "@ngneat/elf";
import {ElfRepository} from "./elf.repository";

@Injectable({providedIn: 'root'})
/****
 * Alle sideefelter skjer her
 */
export class ElfApi {
    url = 'https://localhost:7114/'

    constructor(private http: HttpClient, private repo: ElfRepository) {
    }

    getElves(): void {
        this.http
            .get<Elf[]>(`${this.url}elf`)
            .pipe(
                tap(this.repo.setElf),
                this.repo.trackElfRequestsStatus('elf')
            )
            .subscribe();
    }

    slett(id: Elf['id']) {
        this.http
            .delete<Elf>(`${this.url}elf/${id}`)
            .pipe(
                filterNil(),
                map(({id}) => id),
                tap(this.repo.deleteElf)
            )
            .subscribe();
    }

    lagre(elf: ElfBase): void {
        this.http
            .post<Elf>(`${this.url}elf`, elf)
            .pipe(
                tap(elfFromApi => this.repo.updateElf(elfFromApi.id, elfFromApi))
            )
            .subscribe()
    }

    respawn(): void {
        this.http
            .post<Elf[]>(`${this.url}elf-respawn`, null)
            .pipe(
                tap(this.repo.setElf)
            )
            .subscribe()
    }

    settAktiv(id: Elf['id']): void {
        this.repo.setActive(id);
    }
}
