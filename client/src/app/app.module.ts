import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CreateComponent } from './pages/create/create.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { FitLogComponent } from './pages/fit-log/fit-log.component';
import { WorkoutsComponent } from './pages/workouts/workouts.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutComponent } from './components/workout/workout.component';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';
import { ExerciseTileComponent } from './components/exercise-tile/exercise-tile.component';
import { ExerciseFilterComponent } from './components/exercise-filter/exercise-filter.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ExerciseDragDropComponent } from './components/exercise-drag-drop/exercise-drag-drop.component';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AccountComponent } from './pages/account/account.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';

import { AuthGuard } from './auth/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExerciseDetailsComponent } from './components/exercise-details/exercise-details.component';
import { SafePipe } from './pipes/safe.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragulaModule } from 'ng2-dragula';
import { MatDividerModule } from '@angular/material/divider';
import { EditComponent } from './pages/edit/edit.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'fitlog', component: FitLogComponent, canActivate: [AuthGuard] },
  { path: 'workouts', component: WorkoutsComponent, canActivate: [AuthGuard] },
  {
    path: 'workouts/:id',
    component: EditComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    CreateComponent,
    ExercisesComponent,
    FitLogComponent,
    WorkoutsComponent,
    WorkoutListComponent,
    WorkoutComponent,
    ExerciseListComponent,
    ExerciseTileComponent,
    ExerciseFilterComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ExerciseDragDropComponent,
    WorkoutFormComponent,
    HeaderComponent,
    FooterComponent,
    AccountComponent,
    ChangePassComponent,
    ExerciseDetailsComponent,
    SafePipe,
    EditComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatExpansionModule,
    DragulaModule.forRoot(),
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
