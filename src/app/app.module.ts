import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";

import { AppComponent } from "./app.component";
import { CachingModule } from "./caching/caching.module";
import { CurrentConditionsComponent } from "./current-conditions/current-conditions.component";
import { environment } from "../environments/environment";
import { ForecastsListComponent } from "./forecasts-list/forecasts-list.component";
import { LocationService } from "./services/location.service";
import { MainPageComponent } from "./main-page/main-page.component";
import { routing } from "./app.routing";
import { TabsModule } from "./tabs/tabs.module";
import { WeatherService } from "./services/weather.service";
import { ZipcodeEntryComponent } from "./zipcode-entry/zipcode-entry.component";

@NgModule({
	declarations: [
		AppComponent,
		ZipcodeEntryComponent,
		ForecastsListComponent,
		CurrentConditionsComponent,
		MainPageComponent,
	],
	providers: [LocationService, WeatherService],
	bootstrap: [AppComponent],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		RouterModule,
		routing,
		ServiceWorkerModule.register("/ngsw-worker.js", {
			enabled: environment.production,
		}),
		TabsModule,
		CachingModule.forRoot({
			storage: localStorage,
			urls: [
				"https://api.openweathermap.org/data/2.5/weather",
				"https://api.openweathermap.org/data/2.5/forecast/daily",
			],
			time: 7200,
		}),
	],
})
export class AppModule {}
