import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => ({
		userId: '',
		userName: '',
		expirationTime: null,
		permissionIds: [],
		userMeta: {}
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
		},
		getUserMeta (state): object {
			return state.userMeta
		}
	},
	actions: {
		setUserToken (token: string): void {
			const base64Url = token.split('.')[1]
			const base64 = base64Url.replace('-', '+').replace('_', '/')
			const payload = JSON.parse(window.atob(base64))
			this.userId = payload.id
			this.userName = payload.name
			this.expirationTime = payload.exp
			this.permissionIds = payload.permissionIds
			this.userMeta = payload.userMeta
		},
		resetUserAuthentication(): void {
			this.expirationTime = null
			this.userId = ''
			this.userName = ''
			this.permissionIds = []
			this.userMeta = {}
		},
		doIHavePermissionFor(permissionId: string) :boolean {
			return this.permissionIds.some(x => x === permissionId)
		}
	}	
});
