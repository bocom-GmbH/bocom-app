import { defineStore } from 'pinia';

export const useFileStore = defineStore('file', {
    state: () => ({
        fileData: null
    }),

    getters: {
        getFileData (state) {
            return state.fileData;
        }
    },
    actions: {
        setFileData (fileData:any): void {
            this.fileData = fileData;
        }
    }
});