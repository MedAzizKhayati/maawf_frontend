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
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${localeService.getToken()}`,
    });
    this.baseUrl = envService.apiUrl;
  }

  public async post<T>(endpoint: string, params?: any) {
    const result = await this.httpClient.post<T>(this.baseUrl + endpoint, params, {
      headers: this.headers,
    });

    return result;
  }

  public async get<T>(endpoint: string, params?: any) {
    const result = await this.httpClient.get<T>(this.baseUrl + endpoint, {
      headers: this.headers,
      params
    });

    return result;
  }

  public async patch<T>(endpoint: string, params?: any) {
    const result = await this.httpClient.patch<T>(this.baseUrl + endpoint, params, {
      headers: this.headers,
    });

    return result;
  }

  public async delete<T>(endpoint: string, params?: any) {
    const result = await this.httpClient.delete<T>(this.baseUrl + endpoint, {
      headers: this.headers,
      params
    });

    return result;
  }

  public getFullUrl(endpoint: string) {
    return this.baseUrl + '/' + endpoint;
  }
}
