import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenServiceService } from './token-service.service';

@Injectable()
export class AuthServiceService {
  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  constructor(private Token: TokenServiceService) { }

}
