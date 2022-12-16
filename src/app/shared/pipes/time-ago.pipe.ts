import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(date: Date): string {
    date = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    const seconds = Math.floor((+new Date() - +date) / 1000);
    if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
      return 'Just now';
    const intervals = {
      'y': 31536000,
      'mo': 2592000,
      'w': 604800,
      'd': 86400,
      'h': 3600,
      'm': 60,
      's': 1
    };
    let counter;
    for (const i in intervals) {
      counter = Math.floor(seconds / intervals[i]);
      if (counter > 0)
        if (counter === 1) {
          return counter + i; 
        } else {
          return counter + i;
        }
    }
    return '';
  }

}
