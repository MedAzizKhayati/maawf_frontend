import User from "@/types/user.type";
import { Injectable } from "@angular/core";
import { pki } from "node-forge";
import { firstValueFrom } from "rxjs";
import { CryptographyService } from "../cryptography/cryptography.service";
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
    private localeService: LocaleService,
    private cryptographyService: CryptographyService
  ) { }


  public async register(authDTO: AuthDTO) {
    const keys = this.cryptographyService.generatedRsaKeyPair(authDTO.password);
    const csr = this.cryptographyService.createCertificationRequest(
      this.cryptographyService.decryptPrivateKey(keys.encryptedPrivateKey, authDTO.password),
      pki.publicKeyFromPem(keys.publicKey),
      [
        {
          name: "commonName",
          value: authDTO.firstName + " " + authDTO.lastName,
        },
        {
          name: "emailAddress",
          value: authDTO.email,
        },
      ]
    );
    authDTO = { ...authDTO, ...keys, csr };
    const result = await firstValueFrom(
      await this.httpService.post(Endpoints.Register, authDTO)
    );
    return result;

  }

  public async login(loginDTO: LoginDTO) {
    const result = await firstValueFrom(
      await this.httpService.post<{ user: User, token: string }>(Endpoints.Login, loginDTO)
    );
    result.user.password = loginDTO.password;
    this.localeService.setToken(result.token);
    this.localeService.setUser(result.user);
    return result;
  }

  public async whoami() {
    const token = this.localeService.getToken();
    if (!token)
      return null;

    const user = await firstValueFrom(
      await this.httpService.get<User>(Endpoints.WhoAmI)
    )
      .then(u => u)
      .catch(() => null);

    if (user)
      this.localeService.setUser(user);

    return user;
  }

  public async logout() {
    this.localeService.clear();
  }
}
