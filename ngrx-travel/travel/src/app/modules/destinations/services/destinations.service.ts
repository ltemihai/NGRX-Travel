import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IDestination} from '../../commons/IDestination';

@Injectable({
    providedIn: 'root'
})
export class DestinationsService {

    constructor (private http: HttpClient) {}

    getAllDestinations() {
        return this.http.get('/destinations');
    }

    getDestination(id: number) {
        return this.http.get('/destinations/' + id);
    }

    addDestination(destination: IDestination) {
        return this.http.post('/destinations', destination);
    }
}
