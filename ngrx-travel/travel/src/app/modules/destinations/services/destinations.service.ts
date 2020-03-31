import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DestinationsService {
    constructor (private http: HttpClient) {}

    getAllDestinations() {
        console.log('dfsd');
        return this.http.get('/destinations');
    }

    getDestination(id: number) {
        return this.http.get('/destinations/' + id);
    }
}
