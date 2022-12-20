import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { async } from "rxjs";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styles: [],
})
export class ModalComponent implements OnInit {
  @Input()
  template: TemplateRef<any> | null;
  @Input()
  onSubmit: () => Promise<any> | any;
  @Input()
  onClose: () => Promise<any> | any;
  @Input()
  title: string = "Title";
  @Input()
  isDisabled: boolean = true;
  @Input()
  isVisible: boolean = false;

  isLoading: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  async submit() {
    this.isLoading = true;
    try {
      await this.onSubmit();
      await this.close();
    } catch (e) {
      console.error(e);
    }
  }

  async close() {
    try {
      await this.onClose();
    } catch (e) {
      console.error(e);
    } finally {
      this.isVisible = false;
    }
  }
}
