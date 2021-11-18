import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-info',
  template: `
    <div class="tui-window">
      <fieldset class="tui-fieldset">
        <legend>About</legend>
        <p>From a scientific viewpoint, elves are not considered objectively real. However, elves have in many times and places been believed to be real beings. Where enough people have believed in the reality of elves that those beliefs then had real effects in the world, they can be understood as part of people's worldview, and as a social reality: a thing which, like the exchange value of a dollar bill or the sense of pride stirred up by a national flag, is real because of people's beliefs rather than as an objective reality.</p>
      </fieldset>
    </div>
  `,
  styles: [`
  p {
    max-width: 600px;
  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {}
