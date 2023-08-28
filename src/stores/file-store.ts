import { defineStore } from 'pinia';

export const useFileStore = defineStore('file', {
    state: () => ({
        fileData: null || []
    }),

    getters: {
        getFileData (state) {
            return state.fileData;
        },
        getFileDataById: (state) => (id: string) => {
            return state.fileData.find((fileData: any) => fileData.id === id);
        }
    },
    actions: {
        setFileData (fileData:any): void {
            this.fileData = fileData;
        }
    }
});
