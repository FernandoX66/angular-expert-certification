import { TemplateRef } from "@angular/core";

export interface Tab {
	title: string;
	emitOnDelete: any;
	templateRef: TemplateRef<any>;
}
