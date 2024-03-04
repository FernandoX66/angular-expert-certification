import { Directive, Input, TemplateRef, inject } from "@angular/core";

@Directive({
	selector: "[appTab]",
})
export class TabDirective {
	@Input("appTab") title: string = "";
	@Input("appTabEmitOnDelete") emitOnDelete: any;

	templateRef: TemplateRef<unknown> = inject(TemplateRef);
}
