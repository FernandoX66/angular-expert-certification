import { Injectable, Signal, effect, signal } from "@angular/core";
import { Observable, of } from "rxjs";

import { HttpClient, HttpParams } from "@angular/common/http";
import { CurrentConditions } from "../current-conditions/current-conditions.type";
import { ConditionsAndZip } from "../conditions-and-zip.type";
import { Forecast } from "../forecasts-list/forecast.type";
import { LocationService } from "./location.service";

@Injectable()
export class WeatherService {
	static APPID = "5a4b2d457ecbef9eb2a71e480b947604";
	static CACHE_TIME = 60;
	static ICON_URL =
		"https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/";
	static URL = "http://api.openweathermap.org/data/2.5";
	private currentConditions = signal<ConditionsAndZip[]>([]);

	constructor(
		private http: HttpClient,
		private locationService: LocationService
	) {
		effect(
			() => {
				this.currentConditions.set([]);
				this.locationService
					.locations()
					.forEach((location: string) => this.addCurrentConditions(location));
			},
			{ allowSignalWrites: true }
		);
	}

	addCurrentConditions(zipcode: string): void {
		const params = new HttpParams()
			.append("zip", `${zipcode},us`)
			.append("units", "imperial")
			.append("APPID", WeatherService.APPID);
		// Here we make a request to get the current conditions data from the API. Note the use of backticks and an expression to insert the zipcode
		this.http
			.get<CurrentConditions>(`${WeatherService.URL}/weather`, { params })
			.subscribe((data) => {
				this.currentConditions.update((conditions) => [
					...conditions,
					{ zip: zipcode, data },
				]);
			});
	}

	removeCurrentConditions(zipcode: string) {
		this.currentConditions.update((conditions) => {
			for (let i in conditions) {
				if (conditions[i].zip == zipcode) conditions.splice(+i, 1);
			}
			return conditions;
		});
	}

	getCurrentConditions(): Signal<ConditionsAndZip[]> {
		return this.currentConditions.asReadonly();
	}

	getForecast(zipcode: string): Observable<Forecast> {
		const params = new HttpParams()
			.append("zip", `${zipcode},us`)
			.append("units", "imperial")
			.append("cnt", "5")
			.append("APPID", WeatherService.APPID);
		// Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
		return this.http.get<Forecast>(`${WeatherService.URL}/forecast/daily`, {
			params,
		});
	}

	getWeatherIcon(id): string {
		if (id >= 200 && id <= 232)
			return WeatherService.ICON_URL + "art_storm.png";
		else if (id >= 501 && id <= 511)
			return WeatherService.ICON_URL + "art_rain.png";
		else if (id === 500 || (id >= 520 && id <= 531))
			return WeatherService.ICON_URL + "art_light_rain.png";
		else if (id >= 600 && id <= 622)
			return WeatherService.ICON_URL + "art_snow.png";
		else if (id >= 801 && id <= 804)
			return WeatherService.ICON_URL + "art_clouds.png";
		else if (id === 741 || id === 761)
			return WeatherService.ICON_URL + "art_fog.png";
		else return WeatherService.ICON_URL + "art_clear.png";
	}
}
