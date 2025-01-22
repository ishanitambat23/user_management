import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() user: User = { firstName: '', lastName: '', email: '', id: null };
  @Input() isEditMode: boolean = false; // Determine Add or Edit mode
  @Output() userUpdated = new EventEmitter<void>();
  @Output() formCancelled = new EventEmitter<void>();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = { firstName: '', lastName: '', email: '', id: null };
    // Get the user ID from the route parameter
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEditMode = true; // Set to edit mode
      this.userService.getUserById(Number(userId)).subscribe(
        (user) => {
          if (user) {
            this.user = user; // Populate user data if found
          } else {
            // Handle user not found scenario
            console.error('User not found!');
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          console.error('Error fetching user:', error);
          this.router.navigate(['/home']); // Navigate to home in case of error
        }
      );
    }
  }

  onSubmit() {
    // Add or Update based on the mode
    if (this.isEditMode) {
      // Update user
      this.userService.updateUser(this.user).subscribe(
        () => {
          console.log('User updated:', this.user);
          this.userUpdated.emit();
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      // Add new user
      this.userService.addUser(this.user).subscribe(
        () => {
          console.log('User added:', this.user);
          this.userUpdated.emit();
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    }
  }

  resetForm() {
    this.user = { firstName: '', lastName: '', email: '', id: null };
  }

  cancel() {
    this.resetForm();
    this.formCancelled.emit();
    this.router.navigate(['/home']);
  }
}
