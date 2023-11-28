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

	getters: {
        //returns the active tab string
		getActiveTab(): string {
			return this.activeTab;
		},
        //returns if the backbutton should be available
        isBackButtonAvailable(): boolean {
            return this.backButtonAvailable;
        }
	},

	actions: {
        //if another tab is selected, this function sets the active tab
		setActiveTab(tab: string ) {
			this.activeTab = tab;
		},
        //sets if the backbutton should be available
        setBackButtonAvailable(available: boolean) {
            this.backButtonAvailable = available;
        }
	},
});
