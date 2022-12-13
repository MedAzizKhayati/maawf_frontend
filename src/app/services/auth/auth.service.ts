import User from "@/types/user.type";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Endpoints } from "../http/endpoints";
import { HttpService } from "../http/http.service";
import { LocaleService } from "../locale/locale.service";
import { AuthDTO, LoginDTO } from "./auth-dto";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private httpService: HttpService,
    private localeService: LocaleService
  ) { }

  public async register(authDTO: AuthDTO) {
    try {
      const result = await firstValueFrom(
        await this.httpService.post(Endpoints.Register, authDTO)
      );

      return result;
    } catch (e: any) {
      if (e.status === 500) {
        console.error("User exists");
      }

      return;
    }
  }

  public async login(loginDTO: LoginDTO) {
    try {
      const result = await firstValueFrom(
        await this.httpService.post<{ user: User, token: string }>(Endpoints.Login, loginDTO)
      );

      this.localeService.setToken(result.token);
      this.localeService.setUser(result.user);
    } catch (e: any) {
      console.error(e);
    }
  }

  public async whoami() {
    try {
      const result: User = await firstValueFrom(
        await this.httpService.get(Endpoints.WhoAmI)
      );
      this.localeService.setUser(result);
      return result;
    } catch (e: any) {
      console.error(e);
      return null;
    }
  }
}
