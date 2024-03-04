import { InjectionToken } from "@angular/core";

import { CachingConfig } from "./caching-config.interface";

export const CACHING_CONFIG = new InjectionToken<CachingConfig>(
	"CachingConfig"
);
