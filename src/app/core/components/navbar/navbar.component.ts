import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-cmp',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent {
  sidebarVisible: boolean = false;

  sidebarToggle() {
    const body = document.getElementsByTagName('body')[0];

    if (this.sidebarVisible == false) {
      body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }
}
