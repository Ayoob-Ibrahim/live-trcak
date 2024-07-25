import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LiveTrackComponent } from './live-track/live-track.component';
import { TrackHistoryComponent } from './track-history/track-history.component';
import { TrackIconComponent } from './track-icon/track-icon.component';
import { ExcelReaderComponent } from './excel-reader/excel-reader.component';
export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'track' },
    { path: 'live', component: LiveTrackComponent },
    { path: 'track', component: TrackHistoryComponent },
    { path: 'icon', component: TrackIconComponent },
    { path: 'excel', component: ExcelReaderComponent }
];


