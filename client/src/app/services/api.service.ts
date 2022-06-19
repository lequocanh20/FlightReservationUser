import { User } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Airport } from '../models/airport.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private dbPathAirport = '/airports';
  airportsRef: AngularFireList<Airport> = null;
  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.airportsRef = db.list(this.dbPathAirport);
  }

  getAllAirport(): AngularFireList<Airport> {
    return this.airportsRef;
  }

  sendDataFlightForm(flyingFrom: string, flyingTo, departing: string, adult: number, children: number, travleClass: string) {
    return this.http
        .get(
          `https://api.flightapi.io/onewaytrip/62ae033205a691b3f45ad539/${flyingFrom}/${flyingTo}/${departing}/${adult}/${children}/0/${travleClass}/VND`
        ).pipe(map(responseData => {
          const resultsArray = [];
          // for(const key in responseData) {
          //   if(responseData.hasOwnProperty(key)) {
          //     resultsArray.push({ value: responseData[key], key: key});
          //   }
          // }
          Object.entries(responseData).forEach(([key, value]) => {
            resultsArray.push({ value: value, key: key});
          });
          console.log(resultsArray);
          return resultsArray;    
        }
      )
    )
  }
}
