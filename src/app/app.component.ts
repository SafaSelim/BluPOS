import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { ProductsService } from './main/products/products.service';
import { DataStorageService } from './shared/data-storage.service';

import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /**
   * Application main title
   */
  title = 'blupos';

  userData;
  constructor(
    // private authService: AuthService,
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>
  ) {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  ngOnInit() {
    // this.authService.autoLogin();
    this.store.dispatch(new AuthActions.AutoLogin());

    if (this.userData) {
      this.dataStorageService.getDatas();
    }

  }
}
