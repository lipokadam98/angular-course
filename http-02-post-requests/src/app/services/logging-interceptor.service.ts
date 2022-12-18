import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";


export class LoggingInterceptorService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Request is being logged by the logging interceptor");
    console.log(req);
    return next.handle(req).pipe(tap((event)=>{
      if(event.type === HttpEventType.Response){
        console.log("Response is logged by the logging interceptor:");
        console.log(event.body);
      }
    }));
  }

  constructor() { }
}
