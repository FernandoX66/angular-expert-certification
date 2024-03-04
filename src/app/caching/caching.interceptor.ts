import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
} from "@angular/common/http";
import { inject } from "@angular/core";

import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

import { CACHING_CONFIG } from "./caching-config.token";
import { StorageService } from "./storage.service";

export class cachingInterceptor implements HttpInterceptor {
	private readonly storageService = inject(StorageService);
	private readonly config = inject(CACHING_CONFIG);

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (!this.checkIfCacheable(req)) return next.handle(req);

		const cachedResponse = this.storageService.getItemFrom<any>(
			this.getRequestKey(req)
		);
		if (cachedResponse) {
			const { response, timestamp } = cachedResponse;
			if (this.getSecondsPassedFor(timestamp) <= this.config.time) {
				return of(new HttpResponse(response));
			}
		}

		return next.handle(req).pipe(
			tap((response) => {
				if (response instanceof HttpResponse) {
					this.storageService.set(
						{ response, timestamp: Date.now() },
						this.getRequestKey(req)
					);
				}
			})
		);
	}

	private checkIfCacheable(req: HttpRequest<any>): boolean {
		return this.config.urls.includes(req.url);
	}

	private getRequestKey(req: HttpRequest<any>): string {
		let result = req.url;
		req.params.keys().forEach((key) => {
			const value = req.params.get(key);
			result = result + `@${key}:${value}`;
		});
		return result;
	}

	private getSecondsPassedFor(aTimestamp: number): number {
		return Number(((Date.now() - aTimestamp) / 1000).toFixed(0));
	}
}
