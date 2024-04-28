import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div id="app">
        <main>
          <router-outlet></router-outlet>
        </main>
    </div>
    
  `,
  styles: []
})


/**
 * App Component Composant.
 */
export class AppComponent {
  title = 'app';
}
