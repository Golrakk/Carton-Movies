import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../modeles/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private user: User | null = null
  public token: string;

  constructor(private http: HttpClient) {
    this.token = "";
  }

  public getUser() {
    return this.user
  }

  public registerUser(userModif: User) {
    this.http.post<any>(process.env['API_HOST'] + '/api/user/?username=' + userModif.nom + '&email=' + userModif.email + '&password=' + userModif.password, { title: 'test' }).subscribe(data => {
      var res = data.id;
    })

  }

  public async login(nom: String, password: String) {
    var token: string;
    token = "";

    await this.http.get(process.env['API_HOST'] + '/api/token/?username=' + nom + '&password=' + password).subscribe((res) => {
      token = JSON.stringify(Object.values(res)[0]);
      console.log(token);
    });

    return token;
  }

  public isLoggedIn() {
    return true; //appel api token login
  }
}
