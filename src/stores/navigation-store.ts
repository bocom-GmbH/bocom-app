import { defineStore } from 'pinia';

interface StoreState {
	activeTab: string
}

export const useTabStore = defineStore('tabStore', {
	// define the state
	state: (): StoreState => ({
		activeTab: 'Menü'
	}),

	// define getters
	getters: {
		getActiveTab(): string {
			return this.activeTab;
		},
	},

	// define actions
	actions: {
		setActiveTab(tab: string ) {
			this.activeTab = tab;
		},
	},
});
