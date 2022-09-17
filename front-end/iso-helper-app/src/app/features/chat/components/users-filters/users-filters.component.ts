import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersFilters } from '@features/chat/models/users-filters.model';

@Component({
  selector: 'app-users-filters',
  templateUrl: './users-filters.component.html',
  styleUrls: ['./users-filters.component.scss']
})
export class UsersFiltersComponent implements OnInit {
  @Output() usersFiltersResult: EventEmitter<UsersFilters> = new EventEmitter();

  filtersForm = new FormGroup({
    LastName: new FormControl(),
    Place: new FormControl()
  })

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    let filtersObject: UsersFilters = {
      "lastName": this.filtersForm.value.LastName,
      "place": this.filtersForm.value.Place,
    }
    this.usersFiltersResult.emit(filtersObject);
  }

}
