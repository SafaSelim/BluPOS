import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { ProductsService } from './main/products/products.service';
import { DataStorageService } from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blupos';

  userData;
  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
  ) {
    this.userData =  JSON.parse(localStorage.getItem('userData'));
  }

  ngOnInit() {
    this.authService.autoLogin();

    if(this.userData){
      this.dataStorageService.getScript();
    }

  }
}
