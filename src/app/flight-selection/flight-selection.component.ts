import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { FlightSelection } from '../models/flight-selection.model';
import { ApiServiceService } from '../services/api.service';

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.css']
})
export class FlightSelectionComponent implements OnInit, OnDestroy {
  math = Math;
  constructor(private apiService: ApiServiceService, private route: ActivatedRoute) {}
  flightSelection: any[] = [];
  resultLegs: any[] = []
  resultTrips: any[] = []
  resultFares: any[] = []
  formReservation: { id: string, flyingFrom: string, flyingTo: string, departing: string, adult: number, children: number, travelClass: string }
  paramsSubscription: Subscription
  ngOnInit(): void {
    this.formReservation = {
      id: this.route.snapshot.params['id'],
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
            id: params['id'],
            flyingFrom: params['FlyingFrom'],
            flyingTo: params['FlyingTo'],
            departing: params['Departing'],
            adult: +params['Adult'],
            children: +params['Children'],
            travelClass: params['TravelClass']
          }
        }
      );
    this.getFlightById(this.formReservation.id);
  }
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  getFlightById(legIds: string) {
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
        this.flightSelection.push(this.resultLegs.find(x => x[0].id == legIds));
        console.log(this.flightSelection)
        console.log(this.resultFares);
        console.log(this.resultLegs);
        console.log(this.resultTrips);       
      });
  }
}
