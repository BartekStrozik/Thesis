import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() registered: EventEmitter<boolean> = new EventEmitter();

  signUpForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl?: string;
  error = '';

  selectedFile!: File;
  uploadFinished!: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router,
    private http: HttpClient,
    private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.signUpForm.controls; }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onSignUp() {
    if (this.signUpForm.invalid) {
      return;
    }

    const filedata = new FormData();
    filedata.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('https://localhost:44347/api/Upload', filedata, { observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.uploadFinished = event.body;

          this.authService.register(this.f['Username'].value, this.f['Password'].value, this.f['FirstName'].value, this.f['LastName'].value, this.uploadFinished.dbPath)
            .pipe(first())
            .subscribe(
              data => {
                this.router.navigate([this.returnUrl]);
              },
              error => {
                this.error = 'User with given username already exists!!!!';
                this.loading = false;
              });;
          this.registered.emit(true);
        }
      });
  }
}
