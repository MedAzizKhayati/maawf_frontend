import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { EnvironmentService } from "../environment/environment.service";
import { LocaleService } from "../locale/locale.service";
import { Endpoints } from "./endpoints";

//We can change this later if needed
type HttpConfig = {
  token: string;
};

//We can change this later if needed

@Injectable({
  providedIn: "root",
})
export class HttpService {
  private headers: HttpHeaders;
  private baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    private envService: EnvironmentService,
    private localeService: LocaleService
  ) {
    this.headers = new HttpHeaders({
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${localeService.getToken()}`,
    });
    this.baseUrl = envService.apiUrl;
  }

  public async post(endpoint: Endpoints, params: any) {
    const result = await this.httpClient.post(this.baseUrl + endpoint, params, {
      headers: this.headers,
    });

    return result;
  }

  public async get(endpoint: Endpoints) {
    const result = await this.httpClient.get(this.baseUrl + endpoint, {
      headers: this.headers,
    });

    return result;
  }
}