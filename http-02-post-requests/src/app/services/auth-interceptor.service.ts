import { HttpEvent, HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Request is on its way");
    const modifiedRequest = req.clone({headers: req.headers.append('AuthToken',"asdsadasdas")});
    return next.handle(modifiedRequest).pipe(tap((event)=>{
      if(event.type === HttpEventType.Response){
        console.log("Response arrived:",event.type);
        console.log(event.body);
      }
    }));
  }
}
