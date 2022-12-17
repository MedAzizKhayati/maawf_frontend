import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { HeroIconName } from "ng-heroicon";

export type DropDownItem = {
  title: string;
  route: string;
  icon: HeroIconName;
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
  constructor() {}

  ngOnInit(): void {
    this.dropDownItems = [
      { title: "Profile", route: "/profile", icon: "user" },
      { title: "Settings", route: "/settings", icon: "cog" },
      { title: "Logout", route: "/logout", icon: "logout" },
    ];
  }

  onClick() {
    this.toggle.emit(!this.isOpen);
  }
}
