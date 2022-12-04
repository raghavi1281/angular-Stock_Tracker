import { Pipe, PipeTransform } from '@angular/core';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

@Pipe({
  name: 'month'
})
export class MonthPipe implements PipeTransform {

  transform(value: number): string {
    return monthNames[value-1];
  }

}
