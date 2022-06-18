import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiServiceService } from '../services/api.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  math = Math;
  constructor(private apiService: ApiServiceService, private route: ActivatedRoute) {}
  resultLegs: any[] = []
  resultTrips: any[] = []
  resultFares: any[] = []
  formReservation: { flyingFrom: string, flyingTo: string, departing: string, adult: number, children: number, travelClass: string }
  paramsSubscription: Subscription
  ngOnInit(): void {
    this.formReservation = {
      flyingFrom: this.route.snapshot.params['FlyingFrom'],
      flyingTo: this.route.snapshot.params['FlyingTo'],
      departing: this.route.snapshot.params['Departing'],
      adult: +this.route.snapshot.params['Adult'],
      children: +this.route.snapshot.params['Children'],
      travelClass: this.route.snapshot.params['TravelClass']
    };

    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.formReservation = {
            flyingFrom: params['FlyingFrom'],
            flyingTo: params['FlyingTo'],
            departing: params['Departing'],
            adult: +params['Adult'],
            children: +params['Children'],
            travelClass: params['TravelClass']
          }
        }
      );
    this.getResult();
  }
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  getResult() {
    this.apiService.sendDataFlightForm(this.formReservation.flyingFrom, this.formReservation.flyingTo, this.formReservation.departing,
      this.formReservation.adult, this.formReservation.children, this.formReservation.travelClass).subscribe((response) => {
        response.map(item => {
          if (item.key == 'fares') {
            item.value.map(fares => {
              console.log(fares);
              if (fares.providerCode == "vietjetair.com") {
                this.resultFares.push(Array.of(fares));
              }         
            })
          }            
        })
        response.map(item => {
          if (item.key == 'trips') {
            item.value.map(trips => {
              console.log(trips);
              for (var i = 0; i < this.resultFares.length; i++) 
              {
                console.log(this.resultFares[i][0].tripId);
                if(trips.id == this.resultFares[i][0].tripId) {
                  this.resultTrips.push(Array.of(trips));
                }
              }       
            })
          }         
        })
        response.map(item => {
          if (item.key == 'legs') {        
            item.value.map(legs => {
              console.log(legs);
              for (var i = 0; i < this.resultTrips.length; i++) {
                if (legs.stopoverCode == "DIRECT" && legs.segments[0].airlineCode == "VJ" && legs.id == this.resultTrips[i][0].legIds[0]) {              
                  this.resultLegs.push(Array.of(legs));
                  this.resultLegs.sort((a, b) => a[0].departureTime.localeCompare(b[0].departureTime));;   
                }
              }                       
            })
          }
        })
        console.log(this.resultFares);
        console.log(this.resultLegs);
        console.log(this.resultTrips);       
      });
  }
}
