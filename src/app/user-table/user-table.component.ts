import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  // Method to handle user edit
  onEdit(user: User): void {
    this.userSelected.emit(user);
  }

  // Method to handle user deletion
  onDelete(id: number | null | undefined): void {
    // Check if the id is valid (not null or undefined)
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
