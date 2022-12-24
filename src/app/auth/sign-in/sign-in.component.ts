import { AuthService } from "@/app/services/auth/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent implements OnInit {
  signinForm: FormGroup;
  errorMessage: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  formElement(element: string): FormControl {
    return this.signinForm.get(element) as FormControl;
  }
  onSubmit() {
    console.log(this.signinForm.value);
    if (this.signinForm.invalid) return;
    this.authService
      .login(this.signinForm.value)
      .then((res) => {
        console.log(res);
        if (localStorage.getItem("token")) {
          // this.router.navigate(["/messenger"], { relativeTo: this.route });
          window.location.replace("/messenger");
          console.log(localStorage.getItem("token"));
        }
        this.showSuccess();
      })
      .catch((err) => {
        console.log(err);
        this.errorMessage =
          err.error.message?.join?.(" ") ||
          err.error.message ||
          "An error has occured";
        this.showError(this.errorMessage);
      });
  }

  showSuccess() {
    this.toastrService.success("Login successful!", "Welcome back");
  }

  showError(message: string) {
    this.toastrService.error("Login Failed!", message);
  }
}
