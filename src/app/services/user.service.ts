import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private agifyApiUrl = 'https://api.agify.io';

  constructor(private http: HttpClient) {}

  getAge(name: string) {
    const url = `${this.agifyApiUrl}?name=${name}`;
    return this.http.get<any>(url);
  }
}
