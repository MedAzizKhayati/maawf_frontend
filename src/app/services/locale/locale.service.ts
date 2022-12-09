import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocaleService {
  constructor() { }

  public getToken() {
    return localStorage.getItem("token");
  }

  public setToken(token: string) {
    localStorage.setItem("token", token);
  }

  public getUser() {
    return JSON.parse(localStorage.getItem("user") || "null");
  }

  public setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }
}
