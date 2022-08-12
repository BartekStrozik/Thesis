import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@core/authentication/models/user.model';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { UserService } from '@features/layout/services/user.service';

@Component({
  selector: 'app-personals-change',
  templateUrl: './personals-change.component.html',
  styleUrls: ['./personals-change.component.scss']
})
export class PersonalsChangeComponent implements OnInit {
  personals!: FormGroup;
  returnUrl?: string;

  currentUser!: User;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router,
    private authService: AuthenticationService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.personals = this.formBuilder.group({
      FirstName: [],
      LastName: []
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getUser() {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  get f() { return this.personals.controls; }

  onChange() {
    if (this.personals.invalid) {
      return;
    }

    //console.log(this.f['FirstName'].value, this.f['LastName'].value);
    this.getUser();

    let user: User = this.authService.currentUserValue;
    user.firstName = this.f['FirstName'].value;
    user.lastName = this.f['LastName'].value;
    user.src = '';
    this.userService.updateUser(user).subscribe();

  }
}
