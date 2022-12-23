import { AuthService } from "@/app/services/auth/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

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
    private route: ActivatedRoute
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
      })
      .catch((err) => {
        console.log(err);
        this.errorMessage = err.error.message?.join?.(' ') || err.error.message || "An error has occured";
      });
  }
}
