export interface IFileData {
    Jahr: string;
    TemplateIds: string[];
    id: string;
    label: string;
}

export interface IData {
    data: IData[];
}

export interface IselectedData {
    selectedData: string[];
    addElementToSelectedData: CallableFunction;
    removeElementFromSelectedData: CallableFunction;
    notify: CallableFunction;
}

export const selectedDataSymbol = Symbol('selectedData');

