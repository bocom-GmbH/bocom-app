import { defineStore } from 'pinia';
import { save } from 'app/src/functions/saveTemplate';
import { cloneDeep, find, forEach } from 'lodash';

function updateNestedObject(store: any, id: string, updatedObject: any): void {
    const clonedStore = cloneDeep(store);

    function traverseAndUpdate(currentObj: any) {
        forEach(currentObj, (value, key) => {
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    if (item.id === id) {
                        currentObj.data = cloneDeep(updatedObject);
                        return false;
                    } else if (typeof item === 'object') {
                        traverseAndUpdate(item);
                    }
                });
            } else if (typeof value === 'object') {
                traverseAndUpdate(value);
            }
        });
    }

    traverseAndUpdate(clonedStore);

    return clonedStore;
}



export const useFileStore = defineStore('file', {
    state: () => ({
        fileData: [] as object[],
        currentSite: null
    }),

    getters: {
        getFileData (state) {
            return state.fileData;
        },
        getFileDataById: (state) => (id: string) => {
            return state.fileData?.find((file: any) => file.id === id);
        },
        getCurrentSiteComponents: (state) => () => {
            return state.currentSite
        }
    },
    actions: {
        setFileData (singleFile: object[]): void {
            this.fileData = singleFile;
        },
        setCurrentSite (site: any): void {
           this.currentSite = site;
        },
        update (id: string, updatedObject: any): void {
            if(JSON.stringify(this.currentSite) !== JSON.stringify(updateNestedObject(this.currentSite, id, updatedObject))){
                this.currentSite = updateNestedObject(this.currentSite, id, updatedObject);
                save(this.currentSite);
            }
        }
    }
});
