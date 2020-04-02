import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {destinationsMocks} from "../../modules/destinations/mock/destinations.mock";

@Injectable()
export class DestinationsInterceptor implements HttpInterceptor {

    addedCountry = null;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.interceptDestination(req.url, req.method, req.body);
    }

    private interceptDestination(url: string, method: string, body: any): Observable<HttpEvent<any>> {
        if (url.endsWith('/destinations') && method === 'GET') {
            if (!localStorage.getItem('destinations')) {
                localStorage.setItem('destinations', JSON.stringify(destinationsMocks));
            }
            const data = JSON.parse(localStorage.getItem('destinations'));
            if (!!localStorage.getItem('destination')) {
                data.unshift(JSON.parse(localStorage.getItem('destination')));
                localStorage.setItem('destinations', JSON.stringify(data));
            }
            return new Observable(response => {
                setTimeout(() => {
                    response.next(new HttpResponse<any>({
                        status: 200,
                        body: data
                    }));
                    response.complete();
                }, 2000)
            });
        } else if (url.endsWith('/destinations') && method === 'POST') {
            localStorage.setItem('destination', JSON.stringify(body.data));
            return new Observable(response => {
                setTimeout(() => {
                    response.next(new HttpResponse<any>({
                        status: 200
                    }));
                    response.complete();
                }, 2000)
            });
        }
    }
}




