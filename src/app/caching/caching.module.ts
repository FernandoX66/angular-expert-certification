import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ModuleWithProviders, NgModule } from "@angular/core";

import { CACHING_CONFIG } from "./caching-config.token";
import { CachingConfig } from "./caching-config.interface";
import { cachingInterceptor } from "./caching.interceptor";
import { StorageService } from "./storage.service";

@NgModule()
export class CachingModule {
	static forRoot(config: CachingConfig): ModuleWithProviders<CachingModule> {
		return {
			ngModule: CachingModule,
			providers: [
				StorageService,
				{
					provide: HTTP_INTERCEPTORS,
					useClass: cachingInterceptor,
					multi: true,
				},
				{
					provide: CACHING_CONFIG,
					useValue: config,
				},
			],
		};
	}
}
