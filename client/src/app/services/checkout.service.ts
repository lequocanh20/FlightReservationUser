import { User } from './../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  makePayment(id: string, priceInCents: number, adult: number, children: number) {
    return this.http.post<any>("http://localhost:5000/checkout", 
    JSON.stringify({
      items: [
        { id: id, priceInCents: priceInCents, adult: adult, children: children }
      ]
    }), {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
  sendDataCus(user: User) {
    return this.http.post("https://flightreservation-31cca-default-rtdb.asia-southeast1.firebasedatabase.app/reservations.json",
    user);
  }
}
