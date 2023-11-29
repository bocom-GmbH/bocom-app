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
        // the function stores the userId userName and the expiration time in the store by the token
        setUserData(token: string): void {
            // Splits the JWT token and extracts the payload part (base64Url encoded).
            const base64Url = token.split('.')[1];

            // Replaces URL-specific characters in base64Url with base64 equivalent characters.
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

            // Decodes the base64 encoded string into a JSON string.
            // The decoding process involves converting base64 to binary, then to percent-encoded characters,
            // and finally to a readable JSON string.
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            // Parses the JSON string to an object.
            // If jsonPayload is empty or invalid, 'data' will be null.
            const data = jsonPayload ? JSON.parse(jsonPayload) : null;

            // 'userId', 'userName', and 'expirationTime' are being set based on the token's payload.
            this.userId = data.userId;
            this.userName = data.userName;
            this.expirationTime = data.exp;
        }

    }
});
