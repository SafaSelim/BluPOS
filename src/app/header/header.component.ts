import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
}
)
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  // private userSub: Subscription;
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
  ) {

   }

    ngOnInit() {
   /*    this.userSub = this.authService.user.subscribe( user => {
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      }); */
    }

    ngOnDestroy() {
      // this.userSub.unsubscribe();
    }
}
