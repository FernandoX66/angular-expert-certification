import { Injectable, Signal, signal } from "@angular/core";

export const LOCATIONS: string = "locations";

@Injectable()
export class LocationService {
	private readonly _locations = signal<string[]>([]);

	get locations(): Signal<string[]> {
		return this._locations.asReadonly();
	}

	constructor() {
		this.loadLocationsFromStorage();
	}

	loadLocationsFromStorage(): void {
		const locString = localStorage.getItem(LOCATIONS);
		if (!locString) return;
		this._locations.set(JSON.parse(locString));
	}

	addLocation(zipcode: string) {
		this._locations.update((locations: string[]) => [...locations, zipcode]);
		localStorage.setItem(LOCATIONS, JSON.stringify(this.locations()));
	}

	removeLocation(zipcode: string) {
		this._locations.update((locations: string[]) =>
			locations.filter((location: string) => location !== zipcode)
		);
		localStorage.setItem(LOCATIONS, JSON.stringify(this.locations()));
	}
}
