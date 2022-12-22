import { AuthService } from "@/app/services/auth/auth.service";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { HeroIconName } from "ng-heroicon";

export type DropDownItem = {
  title: string;
  route: string;
  icon: HeroIconName;
  onClick?: () => void;
};

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html"
})
export class DropdownComponent implements OnInit {
  @Input()
  isOpen: boolean = false;

  @Output()
  toggle: EventEmitter<boolean> = new EventEmitter();

  dropDownItems?: DropDownItem[];
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.logout = this.logout.bind(this);
  }

  ngOnInit(): void {
    this.dropDownItems = [
      { title: "Profile", route: "/profile", icon: "user" },
      { title: "Messenger", route: "/messenger", icon: "chat" },
      // { title: "Settings", route: "/settings", icon: "cog" },
      { title: "Logout", route: "/logout", icon: "logout", onClick: this.logout },
    ];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/sign-in"]);
  }

  onClick() {
    this.toggle.emit(!this.isOpen);
  }
}
