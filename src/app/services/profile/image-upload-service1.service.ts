import { Profile } from '@/types/profile.type';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor() { }
  private imageUploaded = new Subject<Profile>();

  imageUploaded$ = this.imageUploaded.asObservable();

  notifyImageUploaded(profile: Profile) {
    this.imageUploaded.next(profile);
  }
}
