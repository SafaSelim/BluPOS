import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { SalesService } from '../main/sales/sales.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
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
    private authService: AuthService,
    private salesService: SalesService,
  ) {

   }

    ngOnInit() {
      this.userSub = this.authService.user.subscribe( user => {
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      });


      this.saleSub = this.salesService.salesChanged.subscribe(saleItem => {
        this.currentItemOnBasket = saleItem.length;
      });
    }


  onSaveData() {
    this.dataStorageService.storeProducts();
  }

  onFetchData() {
    this.dataStorageService.fetchProducts().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.saleSub.unsubscribe();
  }
}
