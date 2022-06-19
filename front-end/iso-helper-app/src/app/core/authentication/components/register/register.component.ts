import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

import { AuthenticationService } from '@core/authentication/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm!: FormGroup;
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
    this.signUpForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.signUpForm.controls; }

  onSignUp() {
    if (this.signUpForm.invalid) {
      return;
    }
    this.authService.register(this.f['Username'].value, this.f['Password'].value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = 'User with given username already exists!!!!';
          this.loading = false;
        });;
      this.router.navigate(['/']);
  }
}
