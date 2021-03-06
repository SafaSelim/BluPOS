import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { SalesService } from '../main/sales/sales.service';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

import * as ProductsActions from '../main/products/store/product.actions';
/**
 * The header component
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
}
)
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  private userSub: Subscription;
  private saleSub: Subscription;
  isAuthenticated = false;

  currentItemOnBasket: number = 0;

  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>,
  ) {

   }

    ngOnInit() {
      this.userSub = this.store
        .select('auth')
        .pipe(map(authState => authState.user))
        .subscribe( user => {
          this.isAuthenticated = !!user;
          console.log(!user);
          console.log(!!user);
      });


    /*this.saleSub = this.salesService.salesChanged.subscribe(saleItem => {
        this.currentItemOnBasket = saleItem.length;
      }); */
      this.saleSub = this.store.select('sales').subscribe(el => {
        this.currentItemOnBasket = el.sales.length;
      });
    }


  onSaveData() {
    this.dataStorageService.storeProducts();
  }

  onFetchData() {
    // this.dataStorageService.fetchProducts().subscribe();
    this.store.dispatch(new ProductsActions.FetchProducts());
  }

  /**
   * Logout Method
   */
  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.saleSub.unsubscribe();
  }
}
