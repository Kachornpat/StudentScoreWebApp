import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ScoreDetailComponent } from './score-detail/score-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page'
    },
    {
        path: 'detail/:studentId',
        component: ScoreDetailComponent,
        title: 'Detail page'
    }
];
