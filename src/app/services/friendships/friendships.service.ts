import { Friendship } from '@/types/friendship.type';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Endpoints } from '../http/endpoints';
import { HttpService } from '../http/http.service';
import { ProfileService } from '../profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class FriendshipsService {

  constructor(
    private httpService: HttpService,
    private profileService: ProfileService
  ) { }

  public async getFriendships(
    type: "incoming" | "outgoing" | "all" = "all",
    status: Friendship["status"] = "accepted"
  ) {
    const profile = this.profileService.getMyProfile();

    return firstValueFrom(
      await this.httpService.get<Friendship[]>(Endpoints.Friendships, {
        type,
        status,
      })
    )
  }

  public async sendFriendRequest(id: string) {
    return firstValueFrom(
      await this.httpService.post<Friendship>(Endpoints.Friendships + id)
    )
  }

  public async acceptFriendRequest(id: string) {
    return firstValueFrom(
      await this.httpService.patch<Friendship>(Endpoints.AcceptFriendRequest + id)
    )
  }
}
