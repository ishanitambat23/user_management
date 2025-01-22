import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { User } from '../user';
import { UserService } from '../user.service'; // Import the UserService

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  @Input() users: User[] = []; // Bind users from parent component
  @Output() userSelected = new EventEmitter<User>(); // Emit selected user for edit

  constructor(private userService: UserService, private router: Router) {} // Inject Router service

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data; // Set the users to the data fetched from the service
    });
  }

  // // Method to handle user edit
  // onEdit(userId: number): void {
  //   this.router.navigate(['/edit', userId]); // Navigates to the edit route with the user's id as a parameter
  // }

  // Method to handle user deletion
  onDelete(id: number | null | undefined): void {
    if (id != null) {
      if (confirm('Are you sure you want to delete this user?')) {
        this.userService.deleteUser(id).subscribe(() => {
          alert('User deleted successfully!');
          this.userService.getUsers().subscribe((users: User[]) => {
            this.users = users;
          });
        });
      }
    } else {
      console.error('Invalid user id');
    }
  }
}
