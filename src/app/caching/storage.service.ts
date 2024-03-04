import { Injectable, inject } from "@angular/core";

import { CACHING_CONFIG } from "./caching-config.token";

@Injectable()
export class StorageService {
	private readonly cachingConfig = inject(CACHING_CONFIG);

	set(anItem: unknown, key: string): void {
		this.cachingConfig.storage.setItem(key, JSON.stringify(anItem));
	}

	getItemFrom<T>(aKey: string): T | null {
		const item = this.cachingConfig.storage.getItem(aKey);
		return item ? JSON.parse(item) : null;
	}
}
