import { ApiServiceService } from '../services/api.service';
import { map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from "jquery";

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css']
})
export class FlightFormComponent implements OnInit {
  constructor(private apiService: ApiServiceService) {}
  title = 'FlightReservation';
  typeOfTravel = ['roundtrip','one-way']
  travelClass: any = ['Economy','Business','First'];
  flyingFrom: any = [];
  flyingTo: any = [];
  numberOfAdult: any = [1,2,3,4,5];
  numberOfChild: any = [0,1,3,4,5];
  reservationForm: FormGroup;
  ngOnInit() {
    this.getAllAirport();
    this.reservationForm = new FormGroup({
      'flight-type': new FormControl('one-way'),
      'FlyingFrom': new FormControl('SGN'),
      'FlyingTo': new FormControl('HAN'),
      'Departing': new FormControl('', [Validators.required]),
      'Returning': new FormControl('', [Validators.nullValidator]),
      'Adults': new FormControl(1),
      'Childrens': new FormControl(0),
      'TravelClass': new FormControl('Economy')
    }),

    this.reservationForm.get('flight-type').valueChanges.subscribe(value => console.log(value));
    
    this.reservationForm.get('flight-type').valueChanges.subscribe(value => {
        if (value == 'one-way') {
          $("#divtxtReturnDate").css({
            display: "none"
          });
          // $("#Returning").removeAttr("required");        
        }
        else {
          $("#divtxtReturnDate").attr('style', 'visibility: visible;');
          // $("#divtxtReturnDate").datepicker("option", "minDate", $("#Departing").datepicker("getDate"));
          // $("#Returning").attr("required", "");
        }
    });
    this.reservationForm.get('flight-type').valueChanges.subscribe(value => {
      if (value == 'one-way') {
        this.reservationForm.get('Returning').clearValidators();       
        this.reservationForm.get('Returning').updateValueAndValidity();
        this.reservationForm.get('Returning').reset();  
      } else {
        this.reservationForm.get('Returning').setValidators([Validators.required]);
        this.reservationForm.get('Returning').updateValueAndValidity();      
      }
    })
  }

  getAllAirport() {
    this.apiService.getAllAirport().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => 
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(airports => {
      this.flyingFrom = airports;
      this.flyingTo = airports;
    })
  }

  onSubmit() {
    console.log(this.reservationForm);
  }
}
