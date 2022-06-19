import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

import { AuthenticationService } from '@core/authentication/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl?: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router,
    private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.signInForm.controls; }

  onSignIn() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signInForm.invalid) {
      return;
    }
    this.authService.login(this.f['Username'].value, this.f['Password'].value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/account']);
        },
        error => {
          this.error = 'Username or password is incorrect!!';
          this.loading = false;
        });;
  }

}
