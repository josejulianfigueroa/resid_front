import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trans',
  pure: false
})
export class TransPipe implements PipeTransform {

  transform(value: any ): any {
  
    let keys = [];

for ( let key in value) {
    
    keys.push(key)
    
}

    return keys;
}

}
