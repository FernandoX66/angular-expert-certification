import { HttpResponse } from "@angular/common/http";

export interface CachedResponse<T> {
	response: HttpResponse<T>;
	timestamp: number;
}
