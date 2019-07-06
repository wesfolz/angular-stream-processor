import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { TweetEffects } from './effects/stream.effects';
import { TweetCounterComponent } from './tweet-counter/tweet-counter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUIModule } from '@swimlane/ngx-ui';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TweetRateComponent } from './tweet-rate/tweet-rate.component';
import { UserPieChartComponent } from './user-pie-chart/user-pie-chart.component';
import { CountryBarChartComponent } from './country-bar-chart/country-bar-chart.component';
import { FilterComponent } from './filter/filter.component';


@NgModule({
  declarations: [
    AppComponent,
    TweetCounterComponent,
    TweetRateComponent,
    UserPieChartComponent,
    CountryBarChartComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    NgxUIModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TweetEffects])
  ],
  providers: [ PubNubAngular ],
  bootstrap: [AppComponent]
})
export class AppModule { }
