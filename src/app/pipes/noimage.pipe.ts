import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  url = 'http://127.0.0.1:8000/img/';

  transform( images: any, edit: boolean = false): string {

    if ( edit ) {
        return 'assets/img/noimage.png'; 
    }

    if ( !images ) {
      return 'assets/img/noimage.png';
    }
    if ( images.length > 0) {
      return this.url + images;
    } else {
      return 'assets/img/noimage.png';
    }

  }
}
