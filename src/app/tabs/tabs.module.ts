import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { TabDirective } from "./tab.directive";
import { TabsComponent } from "./tabs.component";

@NgModule({
	imports: [CommonModule],
	declarations: [TabDirective, TabsComponent],
	exports: [TabDirective, TabsComponent],
})
export class TabsModule {}
