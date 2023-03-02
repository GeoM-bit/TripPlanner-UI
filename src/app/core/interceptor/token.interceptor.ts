import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {TokenModel} from "../../../models/tokenModel";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private authenticationService: AuthenticationService) {}

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const Token = localStorage.getItem("token").split("\"")[3].trim();
    if (Token) {
      req = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + Token)
      });
    }
    return next.handle(req).pipe(
      catchError(error =>{
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('user/login') &&
          error.status === 401
        ) {
          return this.handle401Error(req, next);
        }
        else {
          return throwError(() => error);
        }
      })
    );
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      let currentToken = new TokenModel(localStorage.getItem("token").split("\"")[3].trim(), localStorage.getItem("refreshToken").split("\"")[3].trim());

      if (this.tokenExpired(localStorage.getItem("token").split("\"")[3].trim())) {
        return this.authenticationService.refreshToken(currentToken).pipe(
          switchMap(() => {
            this.isRefreshing = false;

            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;

            if (error.status == '403') {
              //logout which is on register trips pr
            }

            return throwError(() => error);
          })
        );
      }
    }

    return next.handle(request);
  }
}
