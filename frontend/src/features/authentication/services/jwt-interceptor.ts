import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {

  public constructor(
    private readonly authService: AuthService,
  ) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUser;

    if (!currentUser) {
      return next.handle(request);
    }

    return next.handle(request.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser}`,
      },
    }));
  }
}
