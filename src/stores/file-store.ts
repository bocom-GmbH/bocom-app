import { defineStore } from 'pinia';
import { save } from 'app/src/functions/saveTemplate';
import { cloneDeep, find, forEach } from 'lodash';

import { IFileData } from 'src/types';


//the function updates the template by the path and the changed object
function updateNestedObject(store: any, path: string, updatedObject: any): object | null {
    // Clones the 'store' object to avoid modifying the original data directly.
    const clonedStore = cloneDeep(store);

    // Defines a function to recursively traverse and update the cloned store.
    function traverseAndUpdate(currentObj: any) {
        // Iterates over each property or element in the current object or array.
        forEach(currentObj, (value) => {
            // Checks if the current value is an array.
            if (Array.isArray(value)) {
                // Iterates over each item in the array.
                value.forEach((item) => {
                    // Checks if the item's path matches the specified path and updates it.
                    if (item.path === path) {
                        currentObj.data = cloneDeep(updatedObject);
                        return false;
                    } else if (typeof item === 'object') {
                        // Recursively calls the function for nested objects.
                        traverseAndUpdate(item);
                    }
                });
            } else if (typeof value === 'object') {
                // Recursively calls the function for nested objects.
                traverseAndUpdate(value);
            }
        });
    }

    // Starts the recursive traversal and update process from the cloned store.
    traverseAndUpdate(clonedStore);

    // Returns the cloned and possibly updated store object.
    return clonedStore;
}



export const useFileStore = defineStore('file', {
    state: () => ({
        fileData: [] as IFileData[],
        currentSite: null,
        currentSiteMap: []
    }),

    getters: {
        getFileData (state) {
            return state.fileData;
        },
        //returns the desired magazine by id
        getFileDataById: (state) => (id: string) :IFileData | undefined => {
            return state.fileData?.find((file: any) => file.id === id);
        },
        //returns the desired magazine site by site id
        getCurrentSiteComponents: (state) => () => {
            return state.currentSite
        }
    },
    actions: {
        //store the magazines
        setFileData (singleFile: IFileData[]): void {
            this.fileData = singleFile;
        },
        //store the current magazine site
        setCurrentSite (site: any): void {
            this.currentSite = site;
        },
        //updates the template in the store (if there are any changes) and saves it
        update (id: string, updatedObject: any):void {
            if(JSON.stringify(this.currentSite) !== JSON.stringify(updateNestedObject(this.currentSite, updatedObject[0].path, updatedObject))){
                this.currentSite = updateNestedObject(this.currentSite, updatedObject[0].path, updatedObject);
                save(this.currentSite);
            }
        },
        //reset the 'selected' values by path and them saves the template
        resetSelectedValues(path: string) {
            const fullPath = `this.currentSite.${path}`;
            const target = eval(fullPath);
            if(target.data[0].selected) {
                target.data[0].selected = false;
            }
            this.update('temp', target.data)
        },
        setCurrentSiteMap (id: string, label: string, index: number): void {
            this.currentSiteMap.push({id, label, index});
        }
    }
});
