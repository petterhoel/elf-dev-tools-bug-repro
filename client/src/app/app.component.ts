import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
  main {
    margin-top: 2rem;
    display: grid;
    place-items: center;
    gap: 2em;
  }

  p {
    max-width: 600px;
  }
  nav {
    top: 0;
  }
  `],
  template: `
    <nav class="tui-nav">
      <ul>
        <li class="tui-dropdown">
          <span class="red-168-text">N</span>avigate
          <div class="tui-dropdown-content">
            <ul>
              <li><a routerLink="/about"><span class="red-168-text">A</span>bout</a></li>
              <li><a routerLink="/edit"><span class="red-168-text">E</span>dit</a></li>
              <li><a href="https://ngneat.github.io/elf/docs/store" target="_blank" ><span class="red-168-text">E</span>lf docs</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
    <main>
      <img src="/assets/elf.png" alt="elf cartoon logo" width="200px">
      <router-outlet></router-outlet>
    </main>


  `,
})
export class AppComponent {}
