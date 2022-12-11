import { AuthService } from "@/app/services/auth/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Route, Router } from "@angular/router";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        firstName: new FormControl("", [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      {
        validators: this.mustMatch("password", "confirmPassword"),
      }
    );
  }
  onSubmit() {
    if (this.signupForm.invalid) return;
    console.log(this.signupForm.value);
    this.authService
      .register(this.signupForm.value)
      .then((res) => {
        console.log(res);
        this.router.navigate(["/sign-in"], { relativeTo: this.route })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  formElement(element: string): FormControl {
    return this.signupForm.get(element) as FormControl;
  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const pwd = formGroup.controls[password];
      const confirmPwd = formGroup.controls[confirmPassword];
      if (pwd.errors && !confirmPwd.errors["MustMatch"]) return null;
      if (pwd.value !== confirmPwd.value) {
        confirmPwd.setErrors({ MustMatch: true });
      } else {
        confirmPwd.setErrors(null);
      }
    };
  }
}
