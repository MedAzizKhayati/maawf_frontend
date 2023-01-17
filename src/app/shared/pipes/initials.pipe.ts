import { Profile } from '@/types/profile.type';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(profile?: Profile): unknown {
    if (!profile) 
      return 'A';
    const fullName = profile.firstName + ' ' + profile.lastName;
    const initials = fullName.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }

}
