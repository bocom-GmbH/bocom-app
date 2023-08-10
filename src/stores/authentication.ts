import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => ({
		userId: '',
		userName: '',
		expirationTime: null,
		permissionIds: [''],
	}),

	getters: {
		getUserId (state) :string {
			return state.userId
		},
		getUserName (state) :string {
			return state.userName
		},
		getExpirationiTime (state) :number | null {
			return state.expirationTime
		},
		getPermissioinIds (state) :string[] {
			return state.permissionIds
		}
	},
	actions: {
		setPermissions (permissionIds: string[]): void {
			this.permissionIds = [...permissionIds]
		},
		resetUserAuthentication(): void {
			this.expirationTime = null
			this.userId = ''
			this.userName = ''
			this.permissionIds = []
		},
		doIHavePermissionFor(permissionId: string) :boolean {
			return this.permissionIds.some(x => x === permissionId)
		}
	}	
});
