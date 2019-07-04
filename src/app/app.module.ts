import { InMemoryCache } from 'apollo-cache-inmemory';
import { EventsListComponent } from './events-list/events-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { NewEventGQL } from './services/events-subscription';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';




interface Process {
  browser: boolean;
}
declare var process: Process;

@NgModule({
  declarations: [
    AppComponent,
    EventsListComponent
  ],
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [NewEventGQL
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  isbrowser = true;
  constructor(
    apollo: Apollo, httpClient: HttpClient
  ) {


    // apollo.create({

    //   link: httpLink.create({ uri: 'http://127.0.0.1:4200/graphql' }),
    //   cache: new InMemoryCache()
    // });



    // const httpLink = new HttpLink(httpClient).create({
    //   uri: 'http://localhost:4200/graphql'
    // });

    // const subscriptionLink = new WebSocketLink({
    //   uri:
    //     'ws://127.0.0.1:4200/graphql',
    //   options: {
    //     reconnect: true,
    //     // connectionParams: {
    //     //   authToken: localStorage.getItem('token') || null
    //     // }
    //   }
    // });


    // interface Definintion {
    //   kind: string;
    //   operation?: string;
    // }

    // const link = split(
    //   ({ query }) => {
    //     const { kind, operation }: Definintion = getMainDefinition(query);
    //     return kind === 'OperationDefinition' && operation === 'subscription';
    //   },
    //   subscriptionLink,
    //   httpLink,
    // );




    // apollo.create({
    //   ssrMode: true,
    //   link,
    //   cache: new InMemoryCache()
    // });

    const wsLink = this.isbrowser ? new WebSocketLink({ // if you instantiate in the server, the error will be thrown
      uri: `ws://127.0.0.1:4000/graphql`,
      options: {
        reconnect: true
      }
    }) : null;

    const httplink = new HttpLink(httpClient).create({
      uri: 'http://127.0.0.1:4000/graphql'
    });

    interface Definintion {
      kind: string;
      operation?: string;
    }

    const link = this.isbrowser ? split( // only create the split in the browser
      // split based on operation type
      ({ query }) => {
        const { kind, operation }: Definintion = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httplink,
    ) : httplink;



    apollo.create({
      ssrMode: true,
      link,
      cache: new InMemoryCache()
    });


  }
}
