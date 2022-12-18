import { Profile } from '@/types/profile.type';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html'
})
export class CoverComponent implements OnInit {
  @Input()
  profile?: Profile;

  constructor() { }

  ngOnInit(): void {
  }

}
