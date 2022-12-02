import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./components/auth/auth.component";
import { HelloworldComponent } from "./components/helloworld/helloworld.component";

const routes: Routes = [
  {
    path: "hello",
    component: HelloworldComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
