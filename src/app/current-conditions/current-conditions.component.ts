import { Component, inject, Signal } from "@angular/core";
import { Router } from "@angular/router";

import { ConditionsAndZip } from "../conditions-and-zip.type";
import { LocationService } from "../services/location.service";
import { WeatherService } from "../services/weather.service";

@Component({
	selector: "app-current-conditions",
	templateUrl: "./current-conditions.component.html",
	styleUrls: ["./current-conditions.component.css"],
})
export class CurrentConditionsComponent {
	protected weatherService = inject(WeatherService);
	private router = inject(Router);
	protected locationService = inject(LocationService);
	protected currentConditionsByZip: Signal<ConditionsAndZip[]> =
		this.weatherService.getCurrentConditions();

	showForecast(zipcode: string) {
		this.router.navigate(["/forecast", zipcode]);
	}
}
