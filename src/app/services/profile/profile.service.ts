import { objectToFormdata } from '@/app/helpers/objectToFormdata';
import { Profile } from '@/types/profile.type';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { Endpoints } from '../http/endpoints';
import { HttpService } from '../http/http.service';
import { LocaleService } from '../locale/locale.service';
import { UpdateProfileDto } from './update-profile.dto';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileSubject = new Subject<Profile>();
  public profile$ = this.profileSubject.asObservable();

  constructor(
    private httpService: HttpService,
    private localeService: LocaleService
  ) {
    localeService.user$.subscribe((user) => {
      this.profileSubject.next(user.profile);
    });
  }

  public getMyProfile() {
    return this.localeService.getUser().profile;
  }

  public async getProfileById(id: string) {
    return firstValueFrom(
      await this.httpService.get<Profile>(Endpoints.Profile + id)
    );
  }

  public async getProfiles(query: string = '') {
    return firstValueFrom(
      await this.httpService.get<Profile[]>(Endpoints.Profile, {
        query
      })
    );
  }

  public async updateProfile(updateProfileDto: UpdateProfileDto) {
    const formData = objectToFormdata(updateProfileDto);
    const user = this.localeService.getUser();
    const profile = await firstValueFrom(
      await this.httpService.patch<Profile>(Endpoints.Profile, formData)
    );
    user.profile = profile;
    this.localeService.setUser(user);
    return profile;
  }
}
