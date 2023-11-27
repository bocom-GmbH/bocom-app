import { defineStore } from 'pinia';
import { save } from 'app/src/functions/saveTemplate';
import { cloneDeep, find, forEach } from 'lodash';

import { IFileData } from 'src/types';

function updateNestedObject(store: any, path: string, updatedObject: any): void {
    const clonedStore = cloneDeep(store);

    function traverseAndUpdate(currentObj: any) {
        forEach(currentObj, (value, key) => {
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    if (item.path === path) {
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
        fileData: [] as IFileData[],
        currentSite: null
    }),

    getters: {
        getFileData (state) {
            return state.fileData;
        },
        getFileDataById: (state) => (id: string) :IFileData | undefined => {
            return state.fileData?.find((file: any) => file.id === id);
        },
        getCurrentSiteComponents: (state) => () => {
            return state.currentSite
        }
    },
    actions: {
        setFileData (singleFile: IFileData[]): void {
            this.fileData = singleFile;
        },
        setCurrentSite (site: any): void {
            this.currentSite = site;
        },
        update (id: string, updatedObject: any): void {
            //console.log('update run')
            if(JSON.stringify(this.currentSite) !== JSON.stringify(updateNestedObject(this.currentSite, updatedObject[0].path, updatedObject))){
                this.currentSite = updateNestedObject(this.currentSite, updatedObject[0].path, updatedObject);
                save(this.currentSite);
            }
        },
        resetSelectedValues(path: string) {
            const fullPath = `this.currentSite.${path}`;
            const target = eval(fullPath);
            //console.log(target.data[0].selected)
            if(target.data[0].selected) {
                target.data[0].selected = false;
            }
            //console.log(target)
            this.update('temp', target.data)
            //console.log(this.$state.target)
        }
    }
});
