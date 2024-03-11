import { Directive, Input, TemplateRef, inject } from "@angular/core";

@Directive({
	selector: "[appTab]",
})
export class TabDirective {
	@Input("appTab") title: string = "";
	@Input("appTabEmitOnDelete") emitOnDelete: string;

	templateRef: TemplateRef<unknown> = inject(TemplateRef);
}
