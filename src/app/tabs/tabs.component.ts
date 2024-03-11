import {
	AfterContentInit,
	Component,
	ContentChildren,
	EventEmitter,
	OnDestroy,
	Output,
	QueryList,
	TemplateRef,
} from "@angular/core";

import { Subscription } from "rxjs";

import { Tab } from "app/tabs/tab.interface";
import { TabDirective } from "app/tabs/tab.directive";

@Component({
	selector: "app-tabs",
	templateUrl: "./tabs.component.html",
	styleUrl: "./tabs.component.css",
})
export class TabsComponent implements AfterContentInit, OnDestroy {
	@ContentChildren(TabDirective) tabDirectives: QueryList<TabDirective>;
	@Output() itemDeleted: EventEmitter<string> = new EventEmitter<string>();

	activeIndex: number | null = null;
	activeTab: TemplateRef<unknown> | null = null;
	tabs: Tab[] = [];
	tabChangesSub: Subscription;

	ngAfterContentInit(): void {
		this.tabs = this.generateTabs(this.tabDirectives);

		this.tabChangesSub = this.tabDirectives.changes.subscribe(
			(tabDirectives) => {
				this.tabs = this.generateTabs(tabDirectives);
			}
		);
	}

	deleteItem(emitOnDelete: string, anIndex: number): void {
		this.tabs = this.tabs.filter((_, i: number) => anIndex !== i);
		this.itemDeleted.emit(emitOnDelete);
		this.resetActiveTab();
	}

	changeActiveTabTo(anIndex: number): void {
		this.activeTab = this.tabs[anIndex].templateRef;
		this.activeIndex = anIndex;
	}

	generateTabs(tabs: QueryList<TabDirective>): Tab[] {
		this.resetActiveTab();
		return tabs.map(({ title, emitOnDelete, templateRef }) => ({
			title,
			emitOnDelete,
			templateRef,
		}));
	}

	resetActiveTab(): void {
		this.activeTab = null;
		this.activeIndex = null;
	}

	ngOnDestroy(): void {
		this.tabChangesSub.unsubscribe();
	}
}
