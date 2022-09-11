import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Filters } from '@features/filters/models/filters.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Output() filtersResult: EventEmitter<Filters> = new EventEmitter();

  filtersForm = new FormGroup({
    Topic: new FormControl(),
    User: new FormControl(),
    Place: new FormControl()
  })

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    let filtersObject: Filters = {
      "topic": this.filtersForm.value.Topic,
      "user": this.filtersForm.value.User,
      "place": this.filtersForm.value.Place,
    }
    this.filtersResult.emit(filtersObject);
  }

}
