import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'vacancies',
    loadChildren: () =>
      import('./pages/vacancies/vacancies.module').then(
        (m) => m.VacanciesModule
      ),
  },
  {
    path: 'candidates',
    loadChildren: () =>
      import('./pages/candidates/candidates.module').then(
        (m) => m.CandidatesModule
      ),
  },
  {
    path: 'vacancy',
    loadChildren: () =>
      import('./pages/vacancies/vacancy-card/vacancy-card.module').then(
        (m) => m.VacancyCardModule
      ),
  },
  {
    path: 'candidate',
    loadChildren: () =>
      import('./pages/candidates/candidate-card/candidate-card.module').then(
        (m) => m.CandidateCardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
