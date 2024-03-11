import { TemplateRef } from "@angular/core";

export interface Tab {
	title: string;
	emitOnDelete: string;
	templateRef: TemplateRef<unknown>;
}
