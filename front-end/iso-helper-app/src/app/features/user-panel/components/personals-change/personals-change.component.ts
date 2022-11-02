import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@core/authentication/models/user.model';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { UserService } from '@features/user-panel/services/user.service';

@Component({
  selector: 'app-personals-change',
  templateUrl: './personals-change.component.html',
  styleUrls: ['./personals-change.component.scss']
})
export class PersonalsChangeComponent implements OnInit {
  personals!: FormGroup;
  returnUrl?: string;

  currentUser!: User;

  selectedFile!: File;
  uploadFinished!: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.personals = this.formBuilder.group({
      FirstName: [],
      LastName: [],
      Place: []
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getUser() {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  get f() { return this.personals.controls; }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onChange() {
    if (this.personals.invalid) {
      return;
    }

    //console.log(this.f['FirstName'].value, this.f['LastName'].value);
    this.getUser();

    let user: User = this.authService.currentUserValue;
    if(this.f['FirstName'] !=null ) user.firstName = this.f['FirstName'].value;
    if(this.f['LastName'] !=null ) user.lastName = this.f['LastName'].value;
    if(this.f['Place'] !=null ) user.place = this.f['Place'].value;
    
    const filedata = new FormData();
    filedata.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('https://localhost:44347/api/Upload', filedata, { observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.Response){
          this.uploadFinished = event.body;
          user.src = this.uploadFinished.dbPath;
          this.userService.updateUser(user).subscribe();
          this.router.navigate(['/account']);
        }
      })
  }
}
