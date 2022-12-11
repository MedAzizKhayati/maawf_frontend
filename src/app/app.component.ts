import { Component } from "@angular/core";
import { AuthDTO, LoginDTO } from "./services/auth/auth-dto";
import { AuthService } from "./services/auth/auth.service";
import { LocaleService } from "./services/locale/locale.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "GL4_Angular_1";

  constructor(
    private authSerivce: AuthService,
    private localeService: LocaleService
  ) {
    this.whoami();
  }

  public async register() {
    const auth: AuthDTO = {
      firstName: "Amine",
      lastName: "Hamdouni",
      gender: "male",
      email: "hamdouni.medaminn@gmail.com",
      password: "Password11",
    };
    const result = await this.authSerivce.register(auth);

    console.log(result);
  }

  public async login() {
    const auth: LoginDTO = {
      email: "hamdouni.medaminn@gmail.com",
      password: "Password11",
    };
    const result = await this.authSerivce.login(auth);
  }

  public async whoami() {
    const result = await this.authSerivce.whoami();
    console.log('User', result);
  }
}
