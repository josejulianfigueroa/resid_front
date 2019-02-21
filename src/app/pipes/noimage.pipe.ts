import { Pipe, PipeTransform } from '@angular/core';

// Configuracion
import { URL_IMG } from '../config/config';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  url = URL_IMG ;

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
