import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => ({
		userId: '',
		userName: '',
		expirationTime: null,
		permissionIds: [''],
	}),

	getters: {
        isUserLoggedIn (state) :boolean {
            return state.permissionIds.length > 1
        },
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
            return permissionId ? true : this.permissionIds.some(x => x === permissionId)
		},
        setUserData (token: string) :void {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const data = jsonPayload ? JSON.parse(jsonPayload) : null;

            this.userId = data.userId;
            this.userName = data.userName;
            this.expirationTime = data.exp;
        }

    }
});
