import User from "@/types/user.type";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LocaleService {
  private userSubject = new Subject<User>();
  public user$ = this.userSubject.asObservable();

  constructor() { }

  public getToken() {
    return localStorage.getItem("token");
  }

  public setToken(token: string) {
    localStorage.setItem("token", token);
  }

  public getUser() {
    return JSON.parse(localStorage.getItem("user") || "null") as User | null;
  }

  public setUser(user: User) {
    const oldUser = this.getUser();
    localStorage.setItem("user", JSON.stringify({
      ...user,
      password: user.password || oldUser.password,
    }));
    this.userSubject.next(user);
  }

  public clear() {
    localStorage.clear();
  }
}
