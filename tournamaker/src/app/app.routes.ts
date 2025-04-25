import { Routes } from '@angular/router';
import {LoginComponent} from './pages/forms/login/login.component';
import {LandingComponent} from './pages/landing/landing.component';
//import {RegisterFormComponent} from './pages/forms/register-form/register-form.component';
import {AllMatchesComponent} from './pages/all-matches/all-matches.component';
import {AllTournamentsComponent} from './pages/all-tournaments/all-tournaments.component';
import {CreateMatchComponent} from './pages/createForms/create-match/create-match.component';
import {CreateTeamComponent} from './pages/createForms/create-team/create-team.component';
import {CreateTournamentPageComponent} from './pages/createForms/create-tournament-page/create-tournament-page.component';
import {MatchInfoPageComponent} from './pages/match-info-page/match-info-page.component';
import {TournamentViewComponent} from './pages/tournament-view/tournament-view.component';
import {UserPageComponent} from './pages/user-page/user-page.component';
import {AllUsersComponent} from './all-users/all-users.component';
import {MatchViewComponent} from './pages/match-view/match-view.component';

export const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: LandingComponent },
  //{ path: "register", component: RegisterFormComponent },
  { path: "all-matches", component: AllMatchesComponent },
  { path: "all-tournaments", component: AllTournamentsComponent },
  { path: "create-match", component: CreateMatchComponent },
  { path: "create-team", component: CreateTeamComponent },
  { path: "create-tournament", component: CreateTournamentPageComponent },
  { path: "match-info/:id", component: MatchInfoPageComponent },
  { path: "tournament-view", component: TournamentViewComponent },
  { path: "user-page", component: UserPageComponent },
  { path: "match-view/:id", component: MatchViewComponent },
  { path: "all-users", component: AllUsersComponent },
];
