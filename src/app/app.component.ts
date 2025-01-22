import { Component, OnInit } from '@angular/core';
import { User } from './user';  
import { UserService } from './user.service';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: User[] = [];
  selectedUser: User = { firstName: '', lastName: '', email: '', id: null };
  showForm: boolean = false;
  isEditMode: boolean = false; // Track if the form is in Edit mode

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.refreshUsers();
  }

  refreshUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  // Open Add User Form
  openAddUserForm(): void {
    this.selectedUser = { firstName: '', lastName: '', email: '', id: null }; // Reset the selected user
    this.isEditMode = false; // Set to Add mode
    this.showForm = true; // Show the form
  }

  // Open Edit User Form
  onEdit(user: User): void {
    this.selectedUser = { ...user }; // Set the selected user
    this.isEditMode = true; // Set to Edit mode
    this.showForm = true; // Show the form
  }

  // Handle form submit (add or update user)
  onUserAddedOrUpdated(): void {
    this.showForm = false; // Hide the form
    this.refreshUsers(); // Refresh the user list
  }

  cancelForm(): void {
    this.selectedUser = { firstName: '', lastName: '', email: '', id: null }; // Reset selectedUser or handle accordingly
    this.showForm = false; // Hide the form
  }
}

