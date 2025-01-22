import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';  // Correct import for tap
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';  // Your API endpoint

  constructor(private http: HttpClient) { }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Create a new user
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user)
      .pipe(
        tap(response => console.log('Response from POST request:', response))  // Log the response after adding a user
      );
  }

  // Edit an existing user
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  // Delete a user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
