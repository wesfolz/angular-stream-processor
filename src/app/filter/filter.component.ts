import { Component, OnInit } from '@angular/core';
import { AppState } from '../state/stream.state';
import { Store } from '@ngrx/store';
import { setFilter } from '../actions/stream.actions';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filterOptions: any[string];

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.filterOptions = ['All Tweets', 'Original Tweets', 'Reply Tweets'];
  }

  selectFilter(event) {
    if (event.length) {
      this.store.dispatch(setFilter({filter: event[0]}));
    }
  }

}
