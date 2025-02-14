import { Component, NgZone, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Company';

  isLoggedIn = false;

  constructor(private router: Router, private _ngZone: NgZone) {}
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      let currentRoute = this.router.url;
      this.isLoggedIn = !(
        currentRoute === '/admin-login' || currentRoute === '/admin-register'
      );
    });
  }

  logOut() {
    localStorage.removeItem('token');
    this._ngZone.run(() => {
      this.router
        .navigateByUrl('/admin-login')
        .then(() => window.location.reload());
    })
  }
}
