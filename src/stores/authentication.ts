import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => ({
		userId: '',
		userName: '',
		expirationTime: null,
		permissionIds: [''],
	}),

	getters: {
        //returns if the user is logged in by the permission ids
        isUserLoggedIn (state) :boolean {
            return state.permissionIds.length > 1
        },
        //returns the userId as string
		getUserId (state) :string {
			return state.userId
		},
        //returns the userName as string
		getUserName (state) :string {
			return state.userName
		},
        //returns the permissionIds as string array (not used)
		getPermissioinIds (state) :string[] {
			return state.permissionIds
		}
	},
	actions: {
        //stores the permissions in the store
		setPermissions (permissionIds: string[]): void {
			this.permissionIds = [...permissionIds]
		},
         //delete all user data from the store
		resetUserAuthentication(): void {
			this.expirationTime = null
			this.userId = ''
			this.userName = ''
			this.permissionIds = []
		},
        //checks if the user has the permission by permission id
		doIHavePermissionFor(permissionId: string) :boolean {
            return permissionId ? true : this.permissionIds.some(x => x === permissionId)
		},
        // the function stores the userId userName and the expiration time in the sotre by the token
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
