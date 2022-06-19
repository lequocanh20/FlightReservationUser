import { CheckoutService } from './../services/checkout.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input-information',
  templateUrl: './input-information.component.html',
  styleUrls: ['./input-information.component.css']
})
export class InputInformationComponent implements OnInit {
  formGroup: FormGroup;
  dropdownListNamed = ['Ông', 'Bà']
  dropdownListSex = ['Nam', 'Nữ']
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private checkoutService: CheckoutService) {}
  flightSelected: { id: string, originalAmount: number, totalAmount: number, flyingFrom: string, flyingTo: string, departing: string, adult: number, children: number, travelClass: string }
  paramsSubscription: Subscription
  ngOnInit(): void {
    this.flightSelected = {
      id: this.route.snapshot.params['id'],
      originalAmount: this.route.snapshot.params['OriginalAmount'],
      totalAmount: this.route.snapshot.params['TotalAmount'],
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
          this.flightSelected = {
            id: params['id'],
            originalAmount: params['OriginalAmount'],
            totalAmount: params['TotalAmount'],
            flyingFrom: params['FlyingFrom'],
            flyingTo: params['FlyingTo'],
            departing: params['Departing'],
            adult: +params['Adult'],
            children: +params['Children'],
            travelClass: params['TravelClass']
          }
        }
      );
    this.formGroup = this.formBuilder.group({
      formCus: this.formBuilder.array([
        
      ])
    });
    const control = <FormArray>this.formGroup.controls['formCus'];
    for(var i = 0; i < (this.flightSelected.adult + this.flightSelected.children); i++) {
      control.push(
        this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', [Validators.required]],
          named: ['Ông', [Validators.required]],
          sex: ["Nam", [Validators.required]],
          dateOfBirth: [Date.now, [Validators.nullValidator]],
          phonenumber: ['', [Validators.required]],
          phonenumber2: ['', [Validators.required]],
          email: ['', [Validators.required]],
          email2: ['', [Validators.required]]
        }),
      );
    } 
  }
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  makePayment(informCus: FormGroup, id: string, priceInCents: number, adult: number, children: number) {
    return this.checkoutService.makePayment(id, priceInCents, adult, children).subscribe(res => {
      this.checkoutService.sendDataCus(informCus.value).subscribe();
      window.location = res.url;
    })
  }
}
