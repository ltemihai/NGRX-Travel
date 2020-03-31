import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {destinationsMocks} from "../../modules/destinations/mock/destinations.mock";

@Injectable()
export class DestinationsInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return interceptDestination(req.url, req.method);
    }
}

export function interceptDestination(url: string, method: string): Observable<HttpEvent<any>> {
    if (url.endsWith('/destinations') && method === 'GET') {
        return new Observable(response => {
            setTimeout(() => {
                response.next(new HttpResponse<any>({
                    status: 200,
                    body: destinationsMocks
                }));
                response.complete();
            }, 2000)
        });
    }
}
