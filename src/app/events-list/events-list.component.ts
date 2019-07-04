import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Event, Query } from './../../models/events';
import { Observable } from 'rxjs/internal/Observable';
import { NewEventGQL } from '../services/events-subscription';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {


  todoSubscription: Subscription;
  events: Observable<Event[]>;

  subscription = gql`
    subscription EvAdded {
      eventAdded {
        id
      }
    }
  `;

  constructor(private apollo: Apollo) {


  }

  ngOnInit() {
    this.events = this.apollo.watchQuery<Query>({
      query: gql`
        query events {
          events {
            hall {
              name
            }

          }
        }
      `
    })
      .valueChanges
      .pipe(
        map(result => result.data.events)
      );



    this.todoSubscription = this.apollo.subscribe<Subscription>({
      query: this.subscription
    })
      .subscribe(data => {
        console.log('data ', data);
        // this.events = [...this.events, data.Todo.node];
      });




  }

}
