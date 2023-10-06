import { defineStore } from 'pinia';

interface StoreState {
	activeTab: string
    backButtonAvailable: boolean
}

export const useTabStore = defineStore('tabStore', {
	// define the state
	state: (): StoreState => ({
		activeTab: 'Menü',
        backButtonAvailable: false
	}),

	// define getters
	getters: {
		getActiveTab(): string {
			return this.activeTab;
		},
        isBackButtonAvailable(): boolean {
            return this.backButtonAvailable;
        }
	},

	// define actions
	actions: {
		setActiveTab(tab: string ) {
			this.activeTab = tab;
		},
        setBackButtonAvailable(available: boolean) {
            this.backButtonAvailable = available;
        }
	},
});
