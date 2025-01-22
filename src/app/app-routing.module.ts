import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTableComponent } from './user-table/user-table.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  { path: '', component: UserTableComponent },    // Display UserTable at root path
  { path: 'home', component: UserTableComponent }, // Home route to display UserTable
  { path: 'add', component: UserFormComponent },   // Route to display form for adding user
  { path: 'edit/:id', component: UserFormComponent }, // Route for editing user
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
