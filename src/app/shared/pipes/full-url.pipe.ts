import { HttpService } from '@/app/services/http/http.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullUrl'
})
export class FullUrlPipe implements PipeTransform {
  constructor(
    private readonly httpService: HttpService
  ) { }

  transform(relativeUrl: string): string {
    return this.httpService.getFullUrl(relativeUrl);
  }
}
