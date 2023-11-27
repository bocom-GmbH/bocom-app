export interface IFileData {
    Jahr: string;
    TemplateIds: string[];
    id: string;
    label: string;
}

export interface BottomMenuItem {
	label: string,
	icon: string,
    name: string,
	notification: number;
	navigateToPath: string;
}

export interface IData {
    data: IData[];
}

export interface IselectedData {
    selectedData: string[];
    addElementToSelectedData: CallableFunction;
    removeElementFromSelectedData: CallableFunction;
    checkPermission: CallableFunction;
}

export const selectedDataSymbol = Symbol('selectedData');

