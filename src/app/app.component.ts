import { environment } from "@/environments/environment.prod";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  environment?: string;
  constructor() {
    if (environment.apiURL.includes("dev")) {
      this.environment = "develop";
    } else if (environment.apiURL.includes("test")) {
      this.environment = "test";
    }
  }
}
