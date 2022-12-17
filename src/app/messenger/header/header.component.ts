import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "messenger-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  @Input() title = "Messaging";
  isOpen = false;
  constructor() {}

  ngOnInit(): void {}
  onAvatarClick() {
    this.isOpen = !this.isOpen;
  }
}
