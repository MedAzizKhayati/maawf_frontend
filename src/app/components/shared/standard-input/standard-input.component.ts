import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-standard-input',
  templateUrl: './standard-input.component.html',
  styleUrls: ['./standard-input.component.scss']
})
export class StandardInputComponent implements OnInit {
  @Input() label: string='';
  @Input() type: string='';
  constructor() { }

  ngOnInit(): void {
  }

}
