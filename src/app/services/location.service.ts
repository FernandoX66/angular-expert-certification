import { Injectable, Signal, inject, signal } from "@angular/core";

import { StorageService } from "app/caching/storage.service";

export const LOCATIONS: string = "locations";

@Injectable()
export class LocationService {
	private readonly _locations = signal<string[]>([]);
	private readonly storageService = inject(StorageService);

	get locations(): Signal<string[]> {
		return this._locations.asReadonly();
	}

	constructor() {
		this.loadLocationsFromStorage();
	}

	loadLocationsFromStorage(): void {
		const locations = this.storageService.getItemFrom<string[]>(LOCATIONS);
		if (!locations) return;
		this._locations.set(locations);
	}

	addLocation(zipcode: string) {
		this._locations.update((locations: string[]) => [...locations, zipcode]);
		this.storageService.set(this.locations(), LOCATIONS);
	}

	removeLocation(zipcode: string) {
		this._locations.update((locations: string[]) =>
			locations.filter((location: string) => location !== zipcode)
		);
		this.storageService.set(this.locations(), LOCATIONS);
	}
}
