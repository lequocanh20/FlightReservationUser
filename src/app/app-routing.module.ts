import { InputInformationComponent } from './input-information/input-information.component';
import { FlightSelectionComponent } from './flight-selection/flight-selection.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { FlightFormComponent } from './flight-form/flight-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/flight-form', pathMatch: 'full'},
  { path: 'flight-form', component: FlightFormComponent },
  { path: 'search-result/:FlyingFrom/:FlyingTo/:Departing/:Adult/:Children/:TravelClass', component: SearchResultComponent },
  { path: 'flight-selection/:id/:FlyingFrom/:FlyingTo/:Departing/:Adult/:Children/:TravelClass', component: FlightSelectionComponent},
  { path: 'input-information/:id/:OriginalAmount/:TotalAmount/:FlyingFrom/:FlyingTo/:Departing/:Adult/:Children/:TravelClass', component: InputInformationComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
