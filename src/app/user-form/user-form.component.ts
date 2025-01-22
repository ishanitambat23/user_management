import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  @Input() user: User = { firstName: '', lastName: '', email: '', id: null };
  @Input() isEditMode: boolean = false; // Determine Add or Edit mode
  @Output() userUpdated = new EventEmitter<void>();
  @Output() formCancelled = new EventEmitter<void>();

  constructor(private userService: UserService) {}

  onSubmit() {
    if (this.isEditMode) {
      this.userService.updateUser(this.user).subscribe(() => {
        console.log('User updated:', this.user);
        this.userUpdated.emit();
        this.resetForm();
      });
    } else {
      this.userService.addUser(this.user).subscribe(() => {
        console.log('User added:', this.user);
        this.userUpdated.emit();
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.user = { firstName: '', lastName: '', email: '', id: null };
  }

  cancel() {
    this.resetForm();
    this.formCancelled.emit();
  }
}
