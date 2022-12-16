import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "messenger-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  @Input() title = "Messaging";
  constructor() {}

  ngOnInit(): void {}
}
