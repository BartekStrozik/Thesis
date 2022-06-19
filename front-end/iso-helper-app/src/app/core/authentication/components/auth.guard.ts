import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@core/authentication/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser.id > 0) return true;
        else {
            this.router.navigate(['']);
            return false;
        }

        // not logged in so redirect to login page with the return url
        //this.router.navigate(['/sign-in'], { queryParams: { returnUrl: state.url } });
        
    }
}